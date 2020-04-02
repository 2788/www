package config

import (
	"errors"
	"net/http"
)

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

type ServiceProtocol string

const (
	GRPCProtocol ServiceProtocol = "grpc"
)
