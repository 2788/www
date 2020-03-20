package config

import (
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
	Path   string          `yaml:"path"`   // 路由
	Method ProxyMethod     `yaml:"method"` // 路由的请求方式
	Auth   ProxyAuthMethod `yaml:"auth"`   // 鉴权方式
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

	return conf, nil
}
