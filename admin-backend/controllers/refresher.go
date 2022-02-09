package controllers

import (
	"fmt"
	urlPkg "net/url"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/qiniu/xlog.v1"
	"qiniu.com/rmb-web/puck/v3/utils/auth"

	"qiniu.com/www/admin-backend/codes"
	"qiniu.com/www/admin-backend/config"
	fusionRefresh "qiniu.com/www/admin-backend/service/fusion-refresh"
	"qiniu.com/www/admin-backend/service/rs"
	"qiniu.com/www/admin-backend/service/rsf"
)

const (
	timeout                     = 30  // 单位：秒
	lengthLimitForRefresh       = 200 // 刷新输入长度限制
	lengthLimitForPrefixRefresh = 5   // 前缀刷新输入长度限制
)

type Refresher struct {
	conf                 *config.Config
	rsService            *rs.Service
	rsfService           *rsf.Service
	fusionRefreshService *fusionRefresh.Service
	bucket               string
	url                  string
	validPrefixes        map[string]bool // 记录能够被刷新的前缀 map
}

func NewRefresher(config *config.Config) *Refresher {
	qboxTransport := auth.NewQboxAuthTransport(config.Refresher.AccessKey, config.Refresher.SecretKey, nil)
	rsService := rs.NewRsService(config.RsHosts, qboxTransport, timeout)
	rsfService := rsf.NewRsfService(config.RsfHosts, qboxTransport, timeout)
	fusionRefreshService := fusionRefresh.NewFusionRefreshService(config.FusionRefreshHosts, qboxTransport, timeout)
	validPrefixes := make(map[string]bool)
	for _, value := range config.Refresher.PrefixWhitelist {
		validPrefixes[value] = true
	}
	return &Refresher{
		conf:                 config,
		rsService:            rsService,
		rsfService:           rsfService,
		fusionRefreshService: fusionRefreshService,
		bucket:               config.Refresher.Bucket,
		url:                  config.Refresher.Url,
		validPrefixes:        validPrefixes,
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

	// 删除 kodo 对应文件
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
	err = r.rsService.BatchDelete(logger, r.bucket, fileNames)
	if err != nil {
		logger.Errorf("rsService.BatchDelete bucket(%s) error: %v", r.bucket, err)
		SendResponse(c, codes.RefreshFailed, nil)
		return
	}

	// 刷新 cdn 缓存
	err = r.fusionRefreshService.Refresh(logger, input.Paths, r.url)
	if err != nil {
		logger.Errorf("fusionRefreshService.Refresh paths(%+v) error: %v", input.Paths, err)
		SendResponse(c, codes.RefreshFailed, nil)
		return
	}

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

	// 删除 kodo 对应文件
	code, err := r.deleteFilesByPrefixes(logger, input.Prefixes)
	if err != nil {
		logger.Errorf("deleteFilesByPrefixes(%+v) error: %v", input.Prefixes, err)
		SendResponse(c, code, nil)
		return
	}

	// 刷新 cdn 缓存
	err = r.fusionRefreshService.RefreshDirs(logger, input.Prefixes, r.url)
	if err != nil {
		logger.Errorf("fusionRefreshService.RefreshDirs(%+v) error: %v", input.Prefixes, err)
		SendResponse(c, codes.PrefixRefreshFailed, nil)
		return
	}
	SendResponse(c, codes.OK, nil)
}

const (
	prefixListLimit = 1000 // kodo 允许前缀搜索文件的最大 limit
	maxGoroutine    = 20
)

func (r *Refresher) deleteFilesByPrefixes(logger *xlog.Logger, prefixes []string) (code codes.Code, err error) {
	var errList []error
	for _, prefix := range prefixes {
		newPrefix, err := getFileNameOrFilePrefix(prefix)
		if err != nil {
			err = fmt.Errorf("getFileNameOrFilePrefix(%s) error: %v", prefix, err)
			return codes.InvalidArgs, err
		}
		err = r.deleteFilesByPrefix(logger, newPrefix)
		if err != nil {
			errList = append(errList, err)
		}
	}
	if len(errList) > 0 {
		err = fmt.Errorf("deleteFilesByPrefixes error: %v", errList)
		return codes.PrefixRefreshFailed, err
	}
	code = codes.OK
	return
}

func (r *Refresher) deleteFilesByPrefix(logger *xlog.Logger, prefix string) (err error) {
	wg := &sync.WaitGroup{}
	ch := make(chan bool, maxGoroutine)
	mutex := &sync.Mutex{}
	var errStrList []string
	marker := ""
	for {
		nextMarker, err := r.deleteFilesByPrefixWithMarker(logger, prefix, marker, errStrList, mutex, wg, ch)
		if err != nil {
			err = fmt.Errorf("deleteFilesByPrefixWithMarker(%s) error: %v", marker, err)
			return err
		}
		if nextMarker == "" {
			break
		}
		marker = nextMarker
	}
	wg.Wait()
	if len(errStrList) > 0 {
		err = fmt.Errorf("prefix(%s) failedFiles: %s", prefix, strings.Join(errStrList, "; "))
		return
	}
	return
}

func (r *Refresher) deleteFilesByPrefixWithMarker(logger *xlog.Logger, prefix, marker string,
	errStrList []string, mutex *sync.Mutex, wg *sync.WaitGroup, ch chan bool) (nextMarker string, err error) {

	ret, err := r.rsfService.PrefixList(logger, r.bucket, prefix, marker, prefixListLimit)
	if err != nil {
		err = fmt.Errorf("rsfService.PrefixList prefix(%s) marker(%s) error: %v", prefix, marker, err)
		return
	}
	if len(ret.Items) == 0 {
		logger.Warnf("rsfService.PrefixList prefix(%s) no files", prefix)
		return
	}
	files := make([]string, len(ret.Items))
	for index, item := range ret.Items {
		files[index] = item.Key
	}
	wg.Add(1)
	ch <- true
	go func(files []string, logger *xlog.Logger) {
		defer func() {
			wg.Done()
			<-ch
		}()
		er := r.rsService.BatchDelete(logger, r.bucket, files)
		if er != nil {
			logger.Errorf("rsService.BatchDelete bucket(%s) error: %v", r.bucket, er)
			mutex.Lock()
			errStr := fmt.Sprintf("rsService.BatchDelete file[0](%s)-file[%d](%s) count(%d) error: %v",
				files[0], len(files)-1, files[len(files)-1:], len(files), er)
			errStrList = append(errStrList, errStr)
			mutex.Unlock()
			return
		}
	}(files, logger.SpawnWithCtx())

	nextMarker = ret.Marker
	return
}
