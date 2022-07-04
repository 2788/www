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

const cdnBatchLimit = 100 // cdn 一次批量刷新文件缓存的数量限制

func (f *Service) Refresh(logger *xlog.Logger, paths []string, url string) (err error) {
	count := (len(paths)-1)/cdnBatchLimit + 1
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
			for j := i * cdnBatchLimit; j < len(paths) && j < i*cdnBatchLimit+cdnBatchLimit; j++ {
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
// 注意：cdn 一次最多提交 5 个 dirs
func (f *Service) RefreshDirs(logger *xlog.Logger, dirs []string, url string) (err error) {
	var param refreshParam
	for _, dir := range dirs {
		param.Dirs = append(param.Dirs, fmt.Sprintf("%s%s", url, dir))
	}
	refreshRes, err := f.cdnManager.RefreshDirs(param.Dirs)
	if err != nil {
		err = fmt.Errorf("f.cdnManager.RefreshDirs(%+v) error: %v", param.Dirs, err)
		return
	}
	if refreshRes.Code != 200 {
		err = fmt.Errorf("f.cdnManager.RefreshDirs(%+v) not ok, res(%+v)", param.Dirs, refreshRes)
		return
	}

	return
}
