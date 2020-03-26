package env

import (
	"net/http"

	"github.com/qbox/www/janus/env/config"
	"github.com/qbox/www/janus/service/account"
	"github.com/qbox/www/janus/service/gaea"
	"github.com/sirupsen/logrus"
)

var env GlobalEnv

type GlobalEnv struct {
	Cfg              *config.Config
	ProxyCfg         []config.ProxyEntry
	GaeaAdminService gaea.GaeaAdminService
	SSOService       account.SSOService
	AccTr            http.RoundTripper
	Logger           logrus.FieldLogger
}
