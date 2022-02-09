package rs

import (
	"encoding/base64"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"strings"

	"github.com/qiniu/rpc.v1"
	"github.com/qiniu/rpc.v1/lb.v2.1"
	"github.com/qiniu/xlog.v1"
)

type Service struct {
	client *lb.Client
}

func NewRsService(rsHost string, transport http.RoundTripper, timeout int) *Service {
	hosts := strings.Split(rsHost, ",")
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

type batchDeleteRes struct {
	Code float64 `json:"code"`
	Data struct {
		Error string `json:"error"`
	} `json:"data"`
}

// BatchDelete 批量删除文件，忽略文件不存在错误
func (r *Service) BatchDelete(logger *xlog.Logger, bucket string, files []string) (err error) {
	params := make(url.Values)
	for _, file := range files {
		partialValue := base64.URLEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s", bucket, file)))
		value := fmt.Sprintf("/delete/%s", partialValue)
		params.Add("op", value)
	}
	path := "/batch"
	var ret []batchDeleteRes
	err = r.client.CallWithForm(logger, &ret, path, params)
	if err != nil {
		// 298 代表部分成功
		if errInfo, ok := err.(*rpc.ErrorInfo); !ok || errInfo.Code != 298 {
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
		err = nil
		return
	}

	return
}
