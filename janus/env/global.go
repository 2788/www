package env

import (
	"github.com/qbox/www/janus/env/config"
	"github.com/qbox/www/janus/service/account"
	"github.com/qbox/www/janus/service/gaea"
)

var env GlobalEnv

type GlobalEnv struct {
	Cfg *config.Config
	// AccAdminService  account.AdminService
	GaeaAdminService gaea.GaeaAdminService
	SSOService       account.SSOService
}
