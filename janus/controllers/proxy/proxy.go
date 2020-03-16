package proxy

import (
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/gin-gonic/gin"
)

type Proxy struct {
	accTr http.RoundTripper
}

func NewTrandeHandler(accTr http.RoundTripper) *Proxy {
	return &Proxy{
		accTr: accTr,
	}
}

func (s *Proxy) ProxyAll(ctx *gin.Context) {
	// TODO proxy host
	targetURL, err := url.Parse("http://bo-lego-koderover-staging-bo.cs-spock.cloudappl.com")
	if err != nil {
		http.NotFound(ctx.Writer, ctx.Request)
		return
	}

	//TODO Prefix
	path := joinSlash(ctx, "/api/proxy/lego")
	targetQuery := targetURL.RawQuery
	proxy := httputil.ReverseProxy{
		Director: func(req *http.Request) {
			req.URL.Scheme = targetURL.Scheme
			req.URL.Host = targetURL.Host
			req.URL.Path = path
			req.Host = targetURL.Host
			req.Header.Set("Host", targetURL.Host)
			req.Header.Del("Accept-Encoding")

			if targetQuery == "" || req.URL.RawQuery == "" {
				req.URL.RawQuery = targetQuery + req.URL.RawQuery
			} else {
				req.URL.RawQuery = targetQuery + "&" + req.URL.RawQuery
			}
		},
		Transport: s.accTr,
	}

	proxy.ServeHTTP(ctx.Writer, ctx.Request)
}
func joinSlash(ctx *gin.Context, prefix string) string {
	path := ctx.Request.URL.Path[len(prefix):]
	return path
}
