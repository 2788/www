package proxy

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strconv"

	"strings"

	"errors"

	"io/ioutil"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/code"
	"github.com/qbox/www/janus/controllers"
	"github.com/qbox/www/janus/env/config"
	"github.com/sirupsen/logrus"
)

type Proxy struct {
	accTr       http.RoundTripper
	proxyEntrys []config.ProxyEntry
	logger      logrus.FieldLogger
}

func NewProxyHandler(accTr http.RoundTripper, proxyCfg []config.ProxyEntry, logger logrus.FieldLogger) *Proxy {
	return &Proxy{
		accTr:       accTr,
		proxyEntrys: proxyCfg,
		logger:      logger,
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
			req.Header = ctx.Request.Header
			req.Header.Set("Host", targetURL.Host)
			req.Header.Del("Accept-Encoding")
			req.Method = string(targetInfo.Method)
			req.Body = ctx.Request.Body
			req.Form = ctx.Request.Form
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
				matchInfo.Params = match.Params
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
	session := sessions.Default(ctx)
	paramMap := make(map[string]interface{})
	var newBody []byte

	if ctx.Request.Body != nil {
		body, err := ioutil.ReadAll(ctx.Request.Body)
		if err != nil {
			s.logger.Errorf("ioutil.ReadAll err: ", err)
			return err
		}
		if len(body) > 0 {
			err = json.Unmarshal(body, &paramMap)
			if err != nil {
				err = errors.New("Unmarshal failed")
				return err
			}
		}
	}

	for _, paramInfo := range matchInfo.Params {
		paramKey, paramValue, err := s.getParamMessage(session, paramInfo)
		if err != nil {
			return err
		}
		// TODO paramValue 有没有默认值的需求

		switch paramInfo.Location {
		case config.ParamLocationUrlParam:
			ctx.Request.Form.Set(paramKey, fmt.Sprintf("%v", paramValue))
		case config.ParamLocationBody:
			paramMap[paramKey] = paramValue
		case config.ParamLocationHeader:
			ctx.Request.Header.Set(paramKey, fmt.Sprintf("%v", paramValue))
		}
	}

	if len(paramMap) > 0 {
		newBody, _ = json.Marshal(paramMap)
		ctx.Request.Body = ioutil.NopCloser(bytes.NewBuffer(newBody))
		ctx.Request.Header.Set("Content-Length", strconv.Itoa(len(newBody)))
		ctx.Request.ContentLength = int64(len(newBody))
	}

	return nil
}

func (s *Proxy) getParamMessage(session sessions.Session, param config.Param) (paramKey string, paramValue interface{}, err error) {
	if param.SessionKey != "" {
		sessionValue := session.Get(param.SessionKey)
		if sessionValue == nil {
			err = errors.New("session get value failed.")
			return
		}
		if param.Rename != "" {
			paramKey = param.Rename
		} else {
			paramKey = param.SessionKey
		}
		paramValue = sessionValue
	} else {
		paramKey = param.Rename
		if param.CustomValue == nil {
			s.logger.Errorf("<Proxy.getParamMessage> paramKey: %s, customValue is nil", paramKey)
			err = errors.New("customValue is nil")
			return
		}
		paramValue = param.CustomValue
	}

	return
}
