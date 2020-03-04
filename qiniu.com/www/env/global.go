package env

import (
	"qiniu.com/www/env/config"
	"qiniu.com/www/service/account"
)

var env GlobalEnv

type GlobalEnv struct {
	Cfg *config.Config
	// AccAdminService  account.AdminService
	// GaeaAdminService gaea.GaeaAdminService
	SSOService account.SSOService
}
