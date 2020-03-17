package proxy

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"

	"strings"

	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/code"
	"github.com/qbox/www/janus/controllers"
	"github.com/qbox/www/janus/env/config"
)

type Proxy struct {
	accTr       http.RoundTripper
	proxyEntrys []config.ProxyEntry
}

func NewTrandeHandler(accTr http.RoundTripper, proxyCfg []config.ProxyEntry) *Proxy {
	return &Proxy{
		accTr:       accTr,
		proxyEntrys: proxyCfg,
	}
}

func (s *Proxy) ProxyAll(ctx *gin.Context) {
	targetInfo, host := s.getTargetAndHost(ctx)
	if targetInfo == nil || host == "" {
		controllers.RespErr(ctx, code.NotFound, nil)
		return
	}

	targetURL, err := url.Parse(host)
	if err != nil {
		controllers.RespErr(ctx, code.NotFound, nil)
		return
	}

	targetQuery := targetURL.RawQuery
	proxy := httputil.ReverseProxy{
		Director: func(req *http.Request) {
			req.URL.Scheme = targetURL.Scheme
			req.URL.Host = targetURL.Host
			req.URL.Path = targetInfo.Path
			req.Host = targetURL.Host
			req.Header.Set("Host", targetURL.Host)
			req.Header.Del("Accept-Encoding")
			req.Method = string(targetInfo.Method)

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

func (s *Proxy) getTargetAndHost(ctx *gin.Context) (*config.Match, string) {
	var (
		path      = ctx.Request.URL.Path
		matches   = strings.Split(path, "/")
		name      string
		host      string
		matchInfo config.Match
	)

	// 只有 /api/proxy
	if len(matches) <= 3 {
		return nil, ""
	}
	name = matches[3]
	pathArray := matches[4:]

	for _, proxyEntry := range s.proxyEntrys {
		if proxyEntry.Name != name {
			continue
		}

		host = proxyEntry.Target
		for _, match := range proxyEntry.Matches {
			// 关于 method 其实有点余...最终取得还是ctx中的method
			matchPath := strings.Split(match.Path, "/")
			if ctx.Request.Method == string(match.Method) && isSamePath(pathArray, matchPath[1:]) {
				matchInfo.Path = fmt.Sprintf("/%s", strings.Join(pathArray, "/"))
				matchInfo.Method = match.Method
				matchInfo.Auth = match.Auth

				return &matchInfo, host
			}
		}
	}
	return &matchInfo, host
}

func isSamePath(targetPathArray, matchInfoPathArray []string) bool {
	if len(targetPathArray) != len(matchInfoPathArray) {
		return false
	}
	if (targetPathArray == nil) != (matchInfoPathArray == nil) {
		return false
	}

	for i, matchInfoPath := range matchInfoPathArray {
		// path参数
		if strings.Index(matchInfoPath, ":") == 0 {
			continue
		}
		if matchInfoPath != targetPathArray[i] {
			return false
		}
	}

	return true
}
