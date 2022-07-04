package controllers

import (
	"fmt"
	urlPkg "net/url"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/qiniu/xlog.v1"

	"qiniu.com/www/admin-backend/codes"
	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/service/cdn"
	"qiniu.com/www/admin-backend/service/storage"
)

const (
	lengthLimitForRefresh       = 200 // 刷新输入长度限制
	lengthLimitForPrefixRefresh = 5   // 前缀刷新输入长度限制
)

type Refresher struct {
	conf           *config.Config
	storageService *storage.Service
	cdnService     *cdn.Service
	bucket         string
	url            string
	validPrefixes  map[string]bool // 记录能够被刷新的前缀 map
}

func NewRefresher(config *config.Config) *Refresher {
	storageService := storage.New(config.Refresher.AccessKey, config.Refresher.SecretKey)
	cdnService := cdn.New(config.Refresher.AccessKey, config.Refresher.SecretKey)
	validPrefixes := make(map[string]bool)
	for _, value := range config.Refresher.PrefixWhitelist {
		validPrefixes[value] = true
	}
	return &Refresher{
		conf:           config,
		storageService: storageService,
		cdnService:     cdnService,
		bucket:         config.Refresher.Bucket,
		url:            config.Refresher.Url,
		validPrefixes:  validPrefixes,
	}
}

type refreshInput struct {
	Paths []string `json:"paths"`
}

func (r *refreshInput) valid() (bool, codes.Code) {
	if len(r.Paths) == 0 {
		return false, codes.InvalidArgs
	}
	if len(r.Paths) > lengthLimitForRefresh {
		return false, codes.ExceedLengthLimitForRefresh
	}
	for _, path := range r.Paths {
		if !strings.HasPrefix(path, "/") {
			return false, codes.InvalidPaths
		}
	}
	return true, codes.OK
}

func (r *Refresher) Refresh(c *gin.Context) {
	logger := xlog.NewWithReq(c.Request)

	var input refreshInput
	err := c.BindJSON(&input)
	if err != nil {
		logger.Errorf("BindJSON error: %v", err)
		SendResponse(c, codes.InvalidArgs, "parse input failed")
		return
	}
	if valid, code := input.valid(); !valid {
		logger.Errorf("input(%+v) is invalid", input)
		SendResponse(c, code, nil)
		return
	}

	fileNames := make([]string, len(input.Paths))
	for index, path := range input.Paths {
		fileName, err := getFileNameOrFilePrefix(path)
		if err != nil {
			logger.Errorf("getFileNameOrFilePrefix(%s) error: %v", path, err)
			SendResponse(c, codes.InvalidArgs, nil)
			return
		}
		fileNames[index] = fileName
	}

	// 因为当需要删除的文件较多时会耗时较长，为了不影响接口的响应时间，决定异步执行删除文件及刷新 cdn 缓存的操作
	go func() {
		// 删除 kodo 对应文件
		err = r.storageService.BatchDelete(logger, r.bucket, fileNames)
		if err != nil {
			logger.Errorf("rsService.BatchDelete bucket(%s) error: %v", r.bucket, err)
			return
		}

		// 刷新 cdn 缓存
		err = r.cdnService.Refresh(logger, input.Paths, r.url)
		if err != nil {
			logger.Errorf("fusionRefreshService.Refresh paths(%+v) error: %v", input.Paths, err)
			return
		}
		logger.Infof("refresh input(%+v) done", input)
	}()

	SendResponse(c, codes.OK, nil)
}

func getFileNameOrFilePrefix(str string) (res string, err error) {
	url, err := urlPkg.Parse(str)
	if err != nil {
		return
	}
	res = url.Path
	// 去掉最前面的 `/`
	if strings.HasPrefix(url.Path, "/") {
		res = url.Path[1:]
	}
	return
}

type prefixRefreshInput struct {
	Prefixes []string `json:"prefixes"`
}

func (p *prefixRefreshInput) valid(validPrefixes map[string]bool) (bool, codes.Code) {
	if len(p.Prefixes) == 0 {
		return false, codes.InvalidArgs
	}
	if len(p.Prefixes) > lengthLimitForPrefixRefresh {
		return false, codes.ExceedLengthLimitForPrefixRefresh
	}
	for _, prefix := range p.Prefixes {
		if !strings.HasPrefix(prefix, "/") || !strings.HasSuffix(prefix, "/") {
			return false, codes.InvalidPrefixes
		}
		if !validPrefixes[prefix] {
			return false, codes.InvalidPrefixes
		}
	}
	return true, codes.OK
}

func (r *Refresher) PrefixRefresh(c *gin.Context) {
	logger := xlog.NewWithReq(c.Request)

	var input prefixRefreshInput
	err := c.BindJSON(&input)
	if err != nil {
		logger.Errorf("BindJSON error: %v", err)
		SendResponse(c, codes.InvalidArgs, "parse input failed")
		return
	}
	if valid, code := input.valid(r.validPrefixes); !valid {
		logger.Errorf("input(%+v) is invalid", input)
		SendResponse(c, code, nil)
		return
	}

	filePrefixes := make([]string, len(input.Prefixes))
	for index, prefix := range input.Prefixes {
		filePrefix, err := getFileNameOrFilePrefix(prefix)
		if err != nil {
			logger.Errorf("getFileNameOrFilePrefix(%s) error: %v", prefix, err)
			SendResponse(c, codes.InvalidArgs, nil)
			return
		}
		filePrefixes[index] = filePrefix
	}

	// 因为当需要删除的文件较多时会耗时较长，为了不影响接口的响应时间，决定异步执行删除文件及刷新 cdn 缓存的操作
	go func() {
		// 删除 kodo 对应文件
		err = r.deleteFilesByPrefixes(logger, r.bucket, filePrefixes)
		if err != nil {
			logger.Errorf("deleteFilesByPrefixes(%+v) error: %v", filePrefixes, err)
			return
		}
		// 刷新 cdn 缓存
		err = r.cdnService.RefreshDirs(logger, input.Prefixes, r.url)
		if err != nil {
			logger.Errorf("fusionRefreshService.RefreshDirs(%+v) error: %v", input.Prefixes, err)
			return
		}
		logger.Infof("refresh prefixes(%v) done", input.Prefixes)
	}()

	SendResponse(c, codes.OK, nil)
}

func (r *Refresher) deleteFilesByPrefixes(logger *xlog.Logger, bucket string, prefixes []string) error {
	var errList []error
	for _, prefix := range prefixes {
		err := r.storageService.DeleteFilesByPrefix(logger, bucket, prefix)
		if err != nil {
			errList = append(errList, err)
		}
	}
	if len(errList) > 0 {
		err := fmt.Errorf("deleteFilesByPrefixes error: %v", errList)
		return err
	}
	return nil
}
