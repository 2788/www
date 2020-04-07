package env

import (
	"net/http"

	"qiniu.com/qbox/www/janus/env/config"
	"qiniu.com/qbox/www/janus/service/account"
	"github.com/sirupsen/logrus"
)

var Global GlobalEnv

type GlobalEnv struct {
	Cfg        *config.Config
	ProxyCfg   []config.ProxyEntry
	SSOService account.SSOService
	AccTr      http.RoundTripper
	Logger     logrus.FieldLogger
}
