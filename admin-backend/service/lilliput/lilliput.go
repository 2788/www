package lilliput

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/qiniu/rpc.v1/lb.v2.1"
	"github.com/qiniu/xlog.v1"
)

const DefaultTimeoutSeconds = 3

type LilliputService struct {
	client *lb.Client
}

func NewLilliputService(host string, transport http.RoundTripper) *LilliputService {
	hosts := strings.Split(host, ",")
	cfg := &lb.Config{
		Hosts:           hosts,
		TryTimes:        uint32(len(hosts)),
		ClientTimeoutMS: DefaultTimeoutSeconds * 1000,
	}
	client := lb.New(cfg, transport)
	return &LilliputService{client: client}
}

type shortUrlResp struct {
	Code string `json:"code"`
	Host string `json:"host"`
}

func (l *LilliputService) GetShortUrl(logger *xlog.Logger, url string) (shortUrl string, err error) {
	path := fmt.Sprintf("/short-url/get?url=%s", url)
	var res shortUrlResp
	err = l.client.GetCall(logger, &res, path)
	if err != nil {
		return
	}
	shortUrl = fmt.Sprintf("%s/%s", res.Host, res.Code)
	return
}
