package config

import (
	"encoding/json"
	"io/ioutil"
)

type ProxyEntry struct {
	Name    string  `json:"name"`
	Target  string  `json:"target"` // 当前路由对应的后端地址
	Matches []Match `json:"matches"`
}

type Match struct {
	Path   string          `json:"path"`   // 路由
	Method ProxyMethod     `json:"method"` // 路由的请求方式
	Auth   ProxyAuthMethod `json:"auth"`   // 鉴权方式
}

type ProxyAuthMethod string

const (
	// 暂定只支持 admin
	ProxyAuthAdmin ProxyAuthMethod = "admin"
)

type ProxyMethod string

const (
	ProxyMethodGet     ProxyMethod = "GET"
	ProxyMethodHEAD    ProxyMethod = "HEAD"
	ProxyMethodPOST    ProxyMethod = "POST"
	ProxyMethodPUT     ProxyMethod = "PUT"
	ProxyMethodGDELETE ProxyMethod = "DELETE"
	ProxyMethodCONNECT ProxyMethod = "CONNECT"
	ProxyMethodOPTIONS ProxyMethod = "OPTIONS"
	ProxyMethodGTRACE  ProxyMethod = "TRACE"
	ProxyMethodPATCH   ProxyMethod = "PATCH"
)

func ParseProxyEntry(file string) ([]ProxyEntry, error) {
	proxyDate, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, err
	}

	conf := []ProxyEntry{}
	err = json.Unmarshal([]byte(proxyDate), &conf)
	if err != nil {
		return nil, err
	}

	return conf, nil
}
