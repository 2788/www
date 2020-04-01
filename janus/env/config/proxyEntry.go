package config

import (
	"errors"
	"io/ioutil"
	"net/http"

	yaml "gopkg.in/yaml.v2"
)

type ProxyEntry struct {
	Name    string  `yaml:"name"`
	Target  string  `yaml:"target"` // 当前路由对应的后端地址
	Matches []Match `yaml:"matches"`
}

type Match struct {
	Path    string          `yaml:"path"`    // 路由
	Method  ProxyMethod     `yaml:"method"`  // 路由的请求方式
	Auth    ProxyAuthMethod `yaml:"auth"`    // 鉴权方式
	Params  []Param         `yaml:"params"`  // 参数
	Filters []FilterName    `yaml:"filters"` // 过滤条件
}

type Param struct {
	Location    ParamLocation `yaml:"location"`
	SessionKey  string        `yaml:"session_key"`  // session_key
	Rename      string        `yaml:"rename"`       // 参数重命名,如果 rename 为空，则使用 session_key 为参数名
	CustomValue interface{}   `yaml:"custom_value"` // 自定义的参数值，如果 session 中没有存某个值，支持自定义。(仅当 session_key 为空时有效))
}

type ProxyAuthMethod string

const (
	// 暂定只支持 admin
	ProxyAuthAdmin ProxyAuthMethod = "admin"
)

type ProxyMethod string

const (
	ProxyMethodGet     ProxyMethod = http.MethodGet
	ProxyMethodHEAD    ProxyMethod = http.MethodHead
	ProxyMethodPOST    ProxyMethod = http.MethodPost
	ProxyMethodPUT     ProxyMethod = http.MethodPut
	ProxyMethodGDELETE ProxyMethod = http.MethodDelete
	ProxyMethodCONNECT ProxyMethod = http.MethodConnect
	ProxyMethodOPTIONS ProxyMethod = http.MethodOptions
	ProxyMethodTRACE   ProxyMethod = http.MethodTrace
	ProxyMethodPATCH   ProxyMethod = http.MethodPatch
)

type ParamLocation string

const (
	ParamLocationUrlParam ParamLocation = "url_param"
	ParamLocationBody     ParamLocation = "body"
	ParamLocationHeader   ParamLocation = "head"
)

var (
	ParseProxyConfErr              = errors.New("parse proxyConfig failed.")
	ProxyNameIsNil                 = errors.New("proxyConfig name is nil.")
	ProxyTargetIsNil               = errors.New("proxyConfig target is nil.")
	ProxyMatchesPathIsNil          = errors.New("proxyConfig matches path is nil.")
	ProxyMatchesMethodIsNil        = errors.New("proxyConfig matches method is nil.")
	ProxyMatchesParamLacationIsNil = errors.New("proxyConfig matches param location is nil.")
)

type FilterName string

const (
	LoginRequired FilterName = "login_required"
)

func ParseProxyEntry(file string) ([]ProxyEntry, error) {
	proxyDate, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, err
	}

	conf := []ProxyEntry{}
	err = yaml.Unmarshal([]byte(proxyDate), &conf)
	if err != nil {
		return nil, err
	}

	// 前置检查 proxyConfig 必填项是否均已填
	for _, matches := range conf {
		if matches.Name == "" {
			return nil, ProxyNameIsNil
		}
		if matches.Target == "" {
			return nil, ProxyTargetIsNil
		}
		for _, match := range matches.Matches {
			if match.Path == "" {
				return nil, ProxyMatchesPathIsNil
			}
			if match.Method == "" {
				return nil, ProxyMatchesMethodIsNil
			}
			for _, param := range match.Params {
				if param.Location == "" {
					return nil, ProxyMatchesParamLacationIsNil
				}
			}
			// TODO filter 是否有效
		}
	}

	return conf, nil
}
