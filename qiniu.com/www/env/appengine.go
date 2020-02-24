package env

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"qiniu.com/www/controllers/middlewares"
	"qiniu.com/www/env/config"
	"qiniu.com/www/service/account"
	"qiniu.com/www/service/gaea"
)

// InitAppEngine Init gin route engine
func InitAppEngine(l *logrus.Logger, cfg *config.Config) *gin.Engine {
	gin.SetMode(string(cfg.Server.Mode))
	app := gin.New()
	// TODO 后面再细化
	store, err := redis.NewStore(
		10,
		"tcp",
		cfg.Redis.Addrs[0],
		cfg.Redis.Password,
		[]byte("develop-www"),
	)
	if err != nil {
		return app
	}
	store.Options(sessions.Options{MaxAge: 10000000000})
	app.Use(
		gin.Recovery(),
		middlewares.GetReqidMiddleware(),
		middlewares.GetLoggerMiddleware(l),
		middlewares.GetLogReqMiddleware(l),
		sessions.Sessions("www", store),
	)
	accAdminService := initAccAdminService(cfg)
	gaeaService := gaea.NewGaeaAdminService(cfg.Services.GaeaHost, accAdminService.Client(), l)
	env.Cfg = cfg
	env.AccAdminService = accAdminService
	env.GaeaAdminService = gaeaService
	return app
}

func initAccAdminService(cfg *config.Config) account.AdminService {
	return account.NewAdminService(
		cfg.Acc.Host,
		cfg.Acc.ClientID,
		cfg.Acc.ClientSecret,
		cfg.Acc.Username,
		cfg.Acc.Password,
	)
}
