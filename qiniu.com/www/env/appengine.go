package env

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	pacc "github.com/qbox/pay-sdk/base/account"
	"github.com/sirupsen/logrus"
	"qiniu.com/www/controllers/middlewares"
	"qiniu.com/www/env/config"
	"qiniu.com/www/service/account"
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
		l.Errorf("<appengine.InitAppEngine> redis.NewStore() failed, err: %s.", err)
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

	ssoService, err := initAccSSOService(cfg)
	if err != nil {
		l.Errorf("<appengine.InitAppEngine> initAccSSOService() failed, err: %s.", err)
		return app
	}
	env.Cfg = cfg
	// TODO gaeaService adminService
	env.SSOService = ssoService
	return app
}

func initAccSSOService(cfg *config.Config) (account.SSOService, error) {
	accTr, err := pacc.NewTransport(&pacc.AccConfig{
		Host:         cfg.Acc.Host,
		UserName:     cfg.Acc.Username,
		Password:     cfg.Acc.Password,
		ClientID:     cfg.Acc.ClientID,
		ClientSecret: cfg.Acc.ClientSecret,
	})
	if err != nil {
		return nil, err
	}

	return account.NewSSOService(
		cfg.SSO.Host,
		cfg.SSO.ClientId,
		cfg.SSO.ClientSecret,
		accTr), nil
}
