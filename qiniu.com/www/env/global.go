package env

import (
	"qiniu.com/www/env/config"
	"qiniu.com/www/service/account"
	"qiniu.com/www/service/gaea"
)

var env GlobalEnv

type GlobalEnv struct {
	Cfg              *config.Config
	AccAdminService  account.AdminService
	GaeaAdminService gaea.GaeaAdminService
}
