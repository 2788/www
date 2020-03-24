package proxy

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"

	"strings"

	"errors"

	"io/ioutil"

	"github.com/gin-contrib/sessions"
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
	targetInfo, host, err := s.getTargetAndHost(ctx)
	if err != nil {
		controllers.RespErr(ctx, code.NotFound, err)
		return
	}
	err = s.addParam(ctx, targetInfo)
	if err != nil {
		controllers.RespErr(ctx, code.NotFound, err)
		return
	}

	targetURL, err := url.Parse(host)
	if err != nil {
		controllers.RespErr(ctx, code.NotFound, err)
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
			req.Body = ctx.Request.Body
			if targetQuery == "" || req.URL.RawQuery == "" {
				req.URL.RawQuery = targetQuery + req.URL.RawQuery
			} else {
				req.URL.RawQuery = targetQuery + "&" + req.URL.RawQuery
			}
		},
	}

	// 目前仅支持admin
	if targetInfo.Auth == config.ProxyAuthAdmin {
		proxy.Transport = s.accTr
	}

	proxy.ServeHTTP(ctx.Writer, ctx.Request)
}

func (s *Proxy) getTargetAndHost(ctx *gin.Context) (*config.Match, string, error) {
	var (
		path      = ctx.Request.URL.Path
		matches   = strings.Split(path, "/")
		name      string
		host      string
		matchInfo config.Match
		err       error
	)

	// 只有 /api/proxy
	if len(matches) <= 3 {
		err = errors.New("Invalid path.")
		return &matchInfo, host, err
	}

	name = matches[3]

	// path 只有/api/proxy/
	if len(name) == 0 {
		err = errors.New("Invalid path.")
		return &matchInfo, host, err
	}

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
				matchInfo.Param = match.Param
				matchInfo.ContentType = match.ContentType
				return &matchInfo, host, nil
			}
		}
	}

	err = errors.New("Not Find")
	return &matchInfo, host, err
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

func (s *Proxy) addParam(ctx *gin.Context, matchInfo *config.Match) (err error) {
	// TODO 这块switch需要抽出来优化一下,暂时先保证功能测通
	switch {
	case matchInfo.Method == http.MethodGet || matchInfo.Method == http.MethodDelete:
		session := sessions.Default(ctx)

		for _, param := range matchInfo.Param {
			var paramKey string
			var paramValue interface{}

			if param.SessionKey != "" {
				sessionValue := session.Get(param.SessionKey)
				if sessionValue != nil {
					err = errors.New("session get value failed.")
					return err
				}
				if param.Rename != "" {
					paramKey = param.Rename
				} else {
					paramKey = param.SessionKey
				}
				paramValue = sessionValue
			} else {
				paramKey = param.Rename
				paramValue = param.DefaultValue
			}

			ctx.Request.Form.Set(paramKey, paramValue.(string))
		}
	case matchInfo.ContentType == config.ProxyContentTypeJson:
		session := sessions.Default(ctx)
		paramMap := make(map[string]interface{})
		body, err := ioutil.ReadAll(ctx.Request.Body)
		if err != nil {
			fmt.Println("ioutil.ReadAll err: ", err)
			break
		}
		if len(body) > 0 {
			err = json.Unmarshal(body, &paramMap)
			if err != nil {
				err = errors.New("Umarshal failed")
				return err
			}
		}
		for _, param := range matchInfo.Param {
			var paramKey string
			var paramValue interface{}

			if param.SessionKey != "" {
				sessionValue := session.Get(param.SessionKey)
				if sessionValue != nil {
					err = errors.New("session get value failed.")
					return err
				}
				if param.Rename != "" {
					paramKey = param.Rename
				} else {
					paramKey = param.SessionKey
				}
				paramValue = sessionValue
			} else {
				paramKey = param.Rename
				paramValue = param.DefaultValue
			}

			paramMap[paramKey] = paramValue
		}
		jsonString, _ := json.Marshal(paramMap)
		newBody := []byte(jsonString)
		ctx.Request.Body = ioutil.NopCloser(bytes.NewBuffer(newBody))
		ctx.Request.Header.Add("Content-Type", "application/json")
	case matchInfo.ContentType == config.ProxyCententTypeXWwwUrlencoded:
		session := sessions.Default(ctx)
		for _, param := range matchInfo.Param {
			var paramKey string
			var paramValue interface{}

			if param.SessionKey != "" {
				sessionValue := session.Get(param.SessionKey)
				if sessionValue != nil {
					err = errors.New("session get value failed.")
					return err
				}
				if param.Rename != "" {
					paramKey = param.Rename
				} else {
					paramKey = param.SessionKey
				}
				paramValue = sessionValue
			} else {
				paramKey = param.Rename
				paramValue = param.DefaultValue
			}

			ctx.Request.PostForm.Set(paramKey, paramValue.(string))
		}
	}

	return nil
}
