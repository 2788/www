package env

import (
	"net/http"

	"github.com/qbox/www/janus/env/config"
	"github.com/qbox/www/janus/service/account"
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
