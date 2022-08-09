package storage

import (
	"errors"
	"fmt"
	"strings"
	"sync"

	"github.com/qiniu/go-sdk/v7/auth/qbox"
	"github.com/qiniu/go-sdk/v7/client"
	"github.com/qiniu/go-sdk/v7/storage"
	"github.com/qiniu/xlog.v1"
)

const (
	PrefixListLimit = 1000 // kodo 允许前缀搜索文件的最大 limit
	maxGoroutine    = 5    // 因为 kodo 删除文件时会限制 qps，所以这里并发数量不能过大
)

type Service struct {
	BucketManager        *storage.BucketManager
	prefetchMaxGoroutine int // prefetch 操作最大并发数量
}

func New(ak, sk string, prefetchMaxGoroutine int) *Service {
	mac := qbox.NewMac(ak, sk)
	cfg := storage.Config{
		// 是否使用https域名进行资源管理
		UseHTTPS: true,
	}
	bucketManager := storage.NewBucketManager(mac, &cfg)
	return &Service{
		BucketManager:        bucketManager,
		prefetchMaxGoroutine: prefetchMaxGoroutine,
	}
}

// BatchDelete 批量删除文件，忽略文件不存在错误
func (r *Service) BatchDelete(logger *xlog.Logger, bucket string, files []string) (err error) {
	if len(files) == 0 {
		return
	}
	deleteOps := make([]string, 0, len(files))
	for _, file := range files {
		deleteOps = append(deleteOps, storage.URIDelete(bucket, file))
	}
	ret, err := r.BucketManager.Batch(deleteOps)
	if err != nil {
		return
	}
	var errStrList []string
	for index, res := range ret {
		if res.Code != 200 && res.Code != 612 {
			errStrList = append(errStrList, fmt.Sprintf("%s: %s",
				files[index], res.Data.Error))
			continue
		}
		// 文件不存在
		if res.Code == 612 {
			logger.Warnf("delete file(%s) error: %s", files[index], res.Data.Error)
		}
	}
	if len(errStrList) != 0 {
		err = errors.New(strings.Join(errStrList, "; "))
		return
	}

	return
}

func (r *Service) DeleteFilesByPrefix(logger *xlog.Logger, bucket, prefix string) error {
	wg := &sync.WaitGroup{}
	ch := make(chan bool, maxGoroutine)
	mutex := &sync.Mutex{}
	var errStrList []string
	marker := ""
	for {
		entries, _, nextMarker, hasNext, err := r.BucketManager.ListFiles(bucket, prefix, "", marker, PrefixListLimit)
		if err != nil {
			err := fmt.Sprintf("r.bucketManager.ListFiles bucket(%s) prefix(%s) marker(%s) error: %v",
				bucket, prefix, marker, err)
			errStrList = append(errStrList, err)
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
		wg.Add(1)
		ch <- true
		go func(files []string, logger *xlog.Logger) {
			defer func() {
				wg.Done()
				<-ch
			}()
			er := r.BatchDelete(logger, bucket, files)
			if er != nil {
				logger.Errorf("r.BatchDelete bucket(%s) error: %v", bucket, er)
				mutex.Lock()
				errStr := fmt.Sprintf("BatchDelete file[0](%s)-file[%d](%s) count(%d) error: %v",
					files[0], len(files)-1, files[len(files)-1:], len(files), er)
				errStrList = append(errStrList, errStr)
				mutex.Unlock()
				return
			}
		}(files, logger.SpawnWithCtx())

		if !hasNext {
			break
		}
		marker = nextMarker
	}
	wg.Wait()
	if len(errStrList) > 0 {
		err := fmt.Errorf("prefix(%s) failedInfo: %s", prefix, strings.Join(errStrList, "; "))
		return err
	}
	return nil
}

// Prefetch 文档：https://developer.qiniu.com/kodo/1293/prefetch
func (r *Service) Prefetch(logger *xlog.Logger, bucket string, files []string) (err error) {
	if len(files) == 0 {
		return
	}
	wg := &sync.WaitGroup{}
	ch := make(chan bool, r.prefetchMaxGoroutine)
	mutex := &sync.Mutex{}
	var errStrList []string
	for _, file := range files {
		wg.Add(1)
		ch <- true
		go func(file string, logger *xlog.Logger) {
			defer func() {
				wg.Done()
				<-ch
			}()
			er := r.BucketManager.Prefetch(bucket, file)
			if er != nil {
				if errInfo, ok := er.(*client.ErrorInfo); ok && errInfo.Code == 404 {
					logger.Warnf("r.bucketManager.Prefetch file(%s) get 404", file)
					return
				}
				mutex.Lock()
				errStr := fmt.Sprintf("r.bucketManager.Prefetch bucket(%s) file(%s) error: %v", bucket, file, er)
				errStrList = append(errStrList, errStr)
				mutex.Unlock()
				return
			}
		}(file, logger.SpawnWithCtx())
	}
	wg.Wait()
	if len(errStrList) > 0 {
		err = fmt.Errorf("prefetch failedInfo: %s", strings.Join(errStrList, "; "))
	}
	return
}
