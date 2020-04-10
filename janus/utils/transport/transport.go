package transport

import (
	"net/http"
	"net/url"

	"github.com/go-openapi/runtime"
	runCli "github.com/go-openapi/runtime/client"
)

// NewClientTransport initializes a swagger client transport
func NewClientTransport(uri string, client *http.Client) runtime.ClientTransport {
	u, err := url.Parse(uri)
	if err != nil {
		return nil
	}

	var schemes []string
	if u.Scheme != "" {
		schemes = []string{u.Scheme}
	} else {
		schemes = []string{"http"}
	}
	host := u.Host
	basePath := u.Path
	tr := runCli.NewWithClient(host, basePath, schemes, client)
	//这里只需处理 application/x-www-form-urlencoded, 其他类型自带了
	tr.Producers[runtime.URLencodedFormMime] = nil
	return tr
}
