package controllers

import (
	"fmt"
	urlPkg "net/url"
	"regexp"
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
	lengthLimitForPrefixRefresh = 50  // 前缀刷新输入长度限制
)

var pathPattern = regexp.MustCompile("^(/[^/?#]+)*$")

type Refresher struct {
	conf           *config.Config
	storageService *storage.Service
	cdnService     *cdn.Service
	bucket         string
	url            string
}

func NewRefresher(config *config.Config) *Refresher {
	storageService := storage.New(config.Refresher.AccessKey, config.Refresher.SecretKey, config.Refresher.KodoPrefetchMaxGoroutine)
	cdnService := cdn.New(config.Refresher.AccessKey, config.Refresher.SecretKey)
	return &Refresher{
		conf:           config,
		storageService: storageService,
		cdnService:     cdnService,
		bucket:         config.Refresher.Bucket,
		url:            config.Refresher.Url,
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
		if !pathPattern.MatchString(path) {
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

	fileNames, cdnPaths, err := resolvePaths(input.Paths)
	if err != nil {
		logger.Errorf("resolvePaths error: %v", err)
		SendResponse(c, codes.InvalidArgs, nil)
		return
	}

	// 因为当需要处理的文件较多时会耗时较长，为了不影响接口的响应时间，决定异步执行后续刷新操作
	go func() {
		// kodo prefetch
		err = r.prefetchByFiles(logger, fileNames)
		if err != nil {
			logger.Errorf("r.prefetchByFiles error: %v", err)
		}

		// 刷新 cdn 缓存
		err = r.cdnService.Refresh(logger, cdnPaths, r.url)
		if err != nil {
			logger.Errorf("r.cdnService.Refresh paths(%+v) error: %v", cdnPaths, err)
		}
		logger.Infof("refresh input(%+v) done", input)
	}()

	SendResponse(c, codes.OK, nil)
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
	if valid, code := input.valid(r.conf.Refresher.PrefixPathBlacklist); !valid {
		logger.Errorf("input(%+v) is invalid", input)
		SendResponse(c, code, nil)
		return
	}

	fileNames, filePrefixes, cdnPaths, cdnDirs, err := resolvePrefixPaths(input.Paths)
	if err != nil {
		logger.Errorf("resolvePrefixPaths error: %v", err)
		SendResponse(c, codes.InvalidArgs, nil)
		return
	}

	// 因为当需要处理的文件较多时会耗时较长，为了不影响接口的响应时间，决定异步执行后续刷新操作
	go func() {
		// 对前缀本身对应的文件进行 kodo prefetch
		err = r.prefetchByFiles(logger, fileNames)
		if err != nil {
			logger.Errorf("r.prefetchByFiles(%+v) error: %v", fileNames, err)
		}
		// 根据前缀进行 kodo prefetch
		err = r.prefetchByPrefixes(logger, filePrefixes)
		if err != nil {
			logger.Errorf("r.prefetchByPrefixes(%+v) error: %v", filePrefixes, err)
		}
		// 对前缀本身进行 cdn 缓存刷新
		err = r.cdnService.Refresh(logger, cdnPaths, r.url)
		if err != nil {
			logger.Errorf("r.cdnService.Refresh(%+v) error: %v", cdnPaths, err)
		}
		// 根据前缀刷新 cdn 缓存
		err = r.cdnService.RefreshDirs(logger, cdnDirs, r.url)
		if err != nil {
			logger.Errorf("r.cdnService.RefreshDirs(%+v) error: %v", cdnDirs, err)
		}

		logger.Infof("refresh input(%+v) done", input)
	}()

	SendResponse(c, codes.OK, nil)
}

// prefetchByFiles 若文件不需要被删除则通过 kodo 接口进行 prefetch 操作，否则直接进行删除原文件的操作
// 文件是否需要被删除的判断依据见方法 `needToDelete`
func (r *Refresher) prefetchByFiles(logger *xlog.Logger, files []string) error {
	var (
		filesToPrefetch []string
		filesToDelete   []string
	)
	for _, file := range files {
		if needToDelete(file) {
			filesToDelete = append(filesToDelete, file)
		} else {
			filesToPrefetch = append(filesToPrefetch, file)
		}
	}
	if len(filesToDelete) != 0 {
		err := r.storageService.BatchDelete(logger, r.bucket, filesToDelete)
		if err != nil {
			logger.Warnf("r.storageService.BatchDelete bucket(%s) error: %v", r.bucket, err)
		}
	}
	return r.storageService.Prefetch(logger, r.bucket, filesToPrefetch)
}

func (r *Refresher) prefetchByPrefixes(logger *xlog.Logger, prefixes []string) error {
	var errList []error
	for _, prefix := range prefixes {
		err := r.prefetchByPrefix(logger, prefix)
		if err != nil {
			errList = append(errList, err)
		}
	}
	if len(errList) > 0 {
		err := fmt.Errorf("prefetchByPrefixes error: %v", errList)
		return err
	}
	return nil
}

// todo: 有多处类似这样通过前缀 list 文件的逻辑，考虑优化
func (r *Refresher) prefetchByPrefix(logger *xlog.Logger, prefix string) error {
	var errStrList []string
	marker := ""
	for {
		entries, _, nextMarker, hasNext, err := r.storageService.BucketManager.ListFiles(r.bucket,
			prefix, "", marker, storage.PrefixListLimit)
		if err != nil {
			errStr := fmt.Sprintf("r.storageService.BucketManager.ListFiles bucket(%s) prefix(%s) "+
				"marker(%s) error: %v", r.bucket, prefix, marker, err)
			errStrList = append(errStrList, errStr)
			break
		}
		if len(entries) == 0 {
			logger.Warnf("prefix(%s) no files", prefix)
			break
		}
		files := make([]string, len(entries))
		for index, item := range entries {
			files[index] = item.Key
		}
		err = r.prefetchByFiles(logger, files)
		if err != nil {
			errStrList = append(errStrList, err.Error())
		}

		if !hasNext {
			break
		}
		marker = nextMarker
	}
	if len(errStrList) > 0 {
		err := fmt.Errorf("prefix(%s) failedInfo: %s", prefix, strings.Join(errStrList, "; "))
		return err
	}
	return nil
}

// needToDelete 判断一个文件是否需要被删除
// 原因见：https://jira.qiniu.io/browse/RMBWEB-2919?focusedCommentId=337930&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-337930
func needToDelete(file string) bool {
	if strings.Contains(file, "?") || strings.Contains(file, "#") {
		return true
	}
	return false
}

// resolvePaths 解析指定 paths，得到需要从 Kodo 删除的文件名及需要做 CDN 刷新的路径
// eg:
// input: paths: ["","/a"]
// output: fileNames: ["","a","a/"], cdnPaths : ["/","/a","/a/"]
func resolvePaths(paths []string) (fileNames, cdnPaths []string, err error) {
	for _, path := range paths {
		var fileName string
		fileName, err = getFileName(path)
		if err != nil {
			err = fmt.Errorf("getFileName(%s) error: %v", path, err)
			return
		}
		// `https://www.qiniu.com` & `https://www.qiniu.com/` 对应文件名都是空字符串
		if fileName == "" {
			fileNames = append(fileNames, fileName)
		} else {
			// 认为 /foo 和 /foo/ 内容一样，需要同时刷新
			fileNames = append(fileNames, fileName)
			fileNames = append(fileNames, fmt.Sprintf("%s/", fileName))
		}
		// cdn 文件刷新不支持 path 为空
		if path != "" {
			cdnPaths = append(cdnPaths, path)
		}
		cdnPaths = append(cdnPaths, fmt.Sprintf("%s/", path))
	}
	return
}

// resolvePrefixPaths 解析指定的前缀 paths，得到需要从 Kodo 删除的文件名、前缀，及需要做 CDN 刷新的路径、目录
// eg:
// input: paths: ["/a","/a/b"]
// output: fileNames: ["a","a/b"] 、filePrefixes: ["a/","a/b/"]、cdnPaths: ["/a","/a/b"]、cdnDirs: ["/a/","/a/b/"]
func resolvePrefixPaths(paths []string) (fileNames, filePrefixes, cdnPaths, cdnDirs []string, err error) {
	for _, path := range paths {
		var fileName string
		fileName, err = getFileName(path)
		if err != nil {
			err = fmt.Errorf("getFileName(%s) error: %v", path, err)
			return
		}
		// 空字符串会列举空间中所有的文件名
		if fileName == "" {
			filePrefixes = append(filePrefixes, fileName)
		} else {
			fileNames = append(fileNames, fileName)
			filePrefixes = append(filePrefixes, fmt.Sprintf("%s/", fileName))
		}
		// cdn 文件刷新不支持 path 为空
		if path != "" {
			cdnPaths = append(cdnPaths, path)
		}
		cdnDirs = append(cdnDirs, fmt.Sprintf("%s/", path))
	}
	return
}

func getFileName(str string) (res string, err error) {
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
	Paths []string `json:"paths"`
}

func (p *prefixRefreshInput) valid(invalidPaths []string) (bool, codes.Code) {
	if len(p.Paths) == 0 {
		return false, codes.InvalidArgs
	}
	if len(p.Paths) > lengthLimitForPrefixRefresh {
		return false, codes.ExceedLengthLimitForPrefixRefresh
	}
	for _, path := range p.Paths {
		if !pathPattern.MatchString(path) {
			return false, codes.InvalidPaths
		}
		valid := true
		for _, invalidPath := range invalidPaths {
			if path == invalidPath {
				valid = false
				break
			}
		}
		if !valid {
			return false, codes.InvalidPaths
		}
	}
	return true, codes.OK
}

func (r *Refresher) PrefixFastRefresh(c *gin.Context) {
	logger := xlog.NewWithReq(c.Request)

	var input prefixRefreshInput
	err := c.BindJSON(&input)
	if err != nil {
		logger.Errorf("BindJSON error: %v", err)
		SendResponse(c, codes.InvalidArgs, "parse input failed")
		return
	}
	if valid, code := input.valid(r.conf.Refresher.PrefixPathBlacklist); !valid {
		logger.Errorf("input(%+v) is invalid", input)
		SendResponse(c, code, nil)
		return
	}

	fileNames, filePrefixes, cdnPaths, cdnDirs, err := resolvePrefixPaths(input.Paths)
	if err != nil {
		logger.Errorf("resolvePrefixPaths error: %v", err)
		SendResponse(c, codes.InvalidArgs, nil)
		return
	}

	// 因为当需要删除的文件较多时会耗时较长，为了不影响接口的响应时间，决定异步执行删除文件及刷新 cdn 缓存的操作
	go func() {
		// 删除前缀本身对应的文件
		err = r.storageService.BatchDelete(logger, r.bucket, fileNames)
		if err != nil {
			logger.Errorf("r.storageService.BatchDelete bucket(%s) error: %v", r.bucket, err)
		}
		// 用前缀删除 kodo 对应文件
		err = r.deleteFilesByPrefixes(logger, r.bucket, filePrefixes)
		if err != nil {
			logger.Errorf("deleteFilesByPrefixes(%+v) error: %v", filePrefixes, err)
		}
		// 刷新前缀本身对应的 cdn 缓存
		err = r.cdnService.Refresh(logger, cdnPaths, r.url)
		if err != nil {
			logger.Errorf("r.cdnService.Refresh(%+v) error: %v", cdnPaths, err)
		}
		// 根据前缀刷新 cdn 缓存
		err = r.cdnService.RefreshDirs(logger, cdnDirs, r.url)
		if err != nil {
			logger.Errorf("r.cdnService.RefreshDirs(%+v) error: %v", cdnDirs, err)
		}
		logger.Infof("refresh input(%+v) done", input)
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
