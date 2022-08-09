package cdn

import (
	"fmt"
	"sync"

	"github.com/qiniu/go-sdk/v7/auth/qbox"
	"github.com/qiniu/go-sdk/v7/cdn"
	"github.com/qiniu/xlog.v1"
)

type Service struct {
	cdnManager *cdn.CdnManager
}

func New(ak, sk string) *Service {
	mac := qbox.NewMac(ak, sk)
	cdnManager := cdn.NewCdnManager(mac)
	return &Service{
		cdnManager: cdnManager,
	}
}

type refreshParam struct {
	Urls []string `json:"urls"`
	Dirs []string `json:"dirs"`
}

const (
	cdnRefreshFilesBatchLimit = 100 // cdn 一次批量刷新文件缓存的数量限制
	cdnRefreshDirsBatchLimit  = 10  // cdn 一次批量刷新目录缓存的数量限制
)

func (f *Service) Refresh(logger *xlog.Logger, paths []string, url string) (err error) {
	if len(paths) == 0 {
		return
	}
	count := (len(paths)-1)/cdnRefreshFilesBatchLimit + 1
	wg := &sync.WaitGroup{}
	var failedUrls []string
	var mutex sync.Mutex
	for i := 0; i < count; i++ {
		wg.Add(1)
		go func(i int, logger *xlog.Logger) {
			defer func() {
				wg.Done()
			}()
			var param refreshParam
			for j := i * cdnRefreshFilesBatchLimit; j < len(paths) && j < (i+1)*cdnRefreshFilesBatchLimit; j++ {
				param.Urls = append(param.Urls, fmt.Sprintf("%s%s", url, paths[j]))
			}
			refreshRes, er := f.cdnManager.RefreshUrls(param.Urls)
			if er != nil {
				logger.Errorf("f.cdnManager.RefreshUrls(%+v) error: %v", param.Urls, er)
				mutex.Lock()
				failedUrls = append(failedUrls, param.Urls...)
				mutex.Unlock()
				return
			}
			if refreshRes.Code != 200 {
				logger.Errorf("f.cdnManager.RefreshUrls(%+v) not ok, res(%+v)", param.Urls, refreshRes)
				mutex.Lock()
				failedUrls = append(failedUrls, param.Urls...)
				mutex.Unlock()
				return
			}
		}(i, logger.SpawnWithCtx())
	}
	wg.Wait()

	if len(failedUrls) != 0 {
		err = fmt.Errorf("failed urls: %v", failedUrls)
	}
	return
}

// RefreshDirs 刷新目录列表
func (f *Service) RefreshDirs(logger *xlog.Logger, dirs []string, url string) error {
	if len(dirs) == 0 {
		return nil
	}
	count := (len(dirs)-1)/cdnRefreshDirsBatchLimit + 1
	wg := &sync.WaitGroup{}
	var (
		mutex      sync.Mutex
		failedDirs []string
	)
	for i := 0; i < count; i++ {
		wg.Add(1)
		go func(i int, logger *xlog.Logger) {
			defer func() {
				wg.Done()
			}()
			var param refreshParam
			for j := i * cdnRefreshDirsBatchLimit; j < len(dirs) && j < (i+1)*cdnRefreshDirsBatchLimit; j++ {
				param.Dirs = append(param.Dirs, fmt.Sprintf("%s%s", url, dirs[j]))
			}
			refreshRes, er := f.cdnManager.RefreshDirs(param.Dirs)
			if er != nil {
				logger.Errorf("f.cdnManager.RefreshDirs(%+v) error: %v", param.Dirs, er)
				mutex.Lock()
				failedDirs = append(failedDirs, param.Dirs...)
				mutex.Unlock()
				return
			}
			if refreshRes.Code != 200 {
				logger.Errorf("f.cdnManager.RefreshDirs(%+v) not ok, res(%+v)", param.Dirs, refreshRes)
				mutex.Lock()
				failedDirs = append(failedDirs, param.Dirs...)
				mutex.Unlock()
				return
			}
		}(i, logger.SpawnWithCtx())
	}

	wg.Wait()

	if len(failedDirs) != 0 {
		err := fmt.Errorf("failed dirs: %v", failedDirs)
		return err
	}

	return nil
}
