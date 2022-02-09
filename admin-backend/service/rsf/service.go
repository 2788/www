package rsf

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/qiniu/rpc.v1/lb.v2.1"
	"github.com/qiniu/xlog.v1"
)

type Service struct {
	client *lb.Client
}

func NewRsfService(rsfHost string, transport http.RoundTripper, timeout int) *Service {
	hosts := strings.Split(rsfHost, ",")
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

type prefixListRes struct {
	Marker string `json:"marker"`
	Items  []struct {
		Key string `json:"key"`
	} `json:"items"`
}

func (r *Service) PrefixList(logger *xlog.Logger, bucket string, prefix, marker string,
	limit int) (ret prefixListRes, err error) {

	path := fmt.Sprintf("/list?bucket=%s&prefix=%s&marker=%s&limit=%d", bucket, prefix, marker, limit)
	err = r.client.Call(logger, &ret, path)
	return
}
