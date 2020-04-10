package env

import (
	"net/http"

	legoService "github.com/qbox/pay-sdk/http/lego/lego/lego_service"
	"github.com/sirupsen/logrus"
	"qiniu.com/qbox/www/janus/env/config"
	"qiniu.com/qbox/www/janus/service/account"
)

var Global GlobalEnv

type GlobalEnv struct {
	Cfg         *config.Config
	ProxyCfg    []config.ProxyEntry
	SSOService  account.SSOService
	LegoService legoService.ClientService
	AccTr       http.RoundTripper
	Logger      logrus.FieldLogger
}
