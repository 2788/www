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
	Params []Param         `yaml:"params"` //参数
	// ContentType ProxyContentType `yaml:"content_type"` // content-type
}

type Param struct {
	Location    ParamLocation `yaml:"location"`
	SessionKey  string        `yaml:"session_key"`  // session_key
	Rename      string        `yaml:"rename"`       // 参数重命名,如果rename为空，则使用session_key为参数名
	CustomValue interface{}   `yaml:"custom_value"` // 自定义的参数值，如果session中没有存某个值，支持自定义。(仅当 session_key 为空是有效))
	// DefaultValueType  `yaml:"default_value_type"` // 自定义参数的类型，目前仅支持 uint、int、string、double、boolean
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
