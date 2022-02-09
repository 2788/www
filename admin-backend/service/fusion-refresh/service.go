package fusion_refresh

import (
	"fmt"
	"net/http"
	"strings"
	"sync"

	"github.com/qiniu/rpc.v1/lb.v2.1"
	"github.com/qiniu/xlog.v1"
)

type Service struct {
	client *lb.Client
}

func NewFusionRefreshService(fusionRefreshHost string, transport http.RoundTripper, timeout int) *Service {
	hosts := strings.Split(fusionRefreshHost, ",")
	cfg := &lb.Config{
		Hosts:           hosts,
		TryTimes:        uint32(len(hosts)),
		ClientTimeoutMS: timeout * 1000,
	}
	client := lb.New(cfg, transport)
	return &Service{
		client: client,
	}
}

type refreshParam struct {
	Urls []string `json:"urls"`
	Dirs []string `json:"dirs"`
}

type refreshRes struct {
	Code          int               `json:"code"`
	Error         string            `json:"error"`
	RequestId     string            `json:"requestId"`
	TaskIds       map[string]string `json:"taskIds"`
	InvalidUrls   []string          `json:"invalidUrls"`
	InvalidDirs   []string          `json:"invalidDirs"`
	UrlQuotaDay   int               `json:"urlQuotaDay"`
	UrlSurplusDay int               `json:"urlSurplusDay"`
	DirQuotaDay   int               `json:"dirQuotaDay"`
	DirSurplusDay int               `json:"dirSurplusDay"`
}

const cdnBatchLimit = 20 // cdn 一次批量刷新文件缓存的数量限制

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
			path := "/refresh"
			var res refreshRes
			er := f.client.CallWithJson(logger, &res, path, param)
			if er != nil {
				logger.Errorf("refresh param(%+v) error: %v", param, er)
				mutex.Lock()
				failedUrls = append(failedUrls, param.Urls...)
				mutex.Unlock()
				return
			}
			if res.Code != 200 {
				logger.Errorf("refresh param(%+v) not ok, res(%+v)", param, res)
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
	path := "/refresh"
	var res refreshRes
	err = f.client.CallWithJson(logger, &res, path, param)
	if err != nil {
		err = fmt.Errorf("refresh dirs param(%+v) error: %v", param, err)
		return
	}
	if res.Code != 200 {
		err = fmt.Errorf("refresh dirs param(%+v) not ok, res(%+v)", param, res)
		return
	}

	return
}
