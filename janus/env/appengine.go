package env

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	pacc "github.com/qbox/pay-sdk/base/account"
	"github.com/qbox/www/janus/controllers/middlewares"
	"github.com/qbox/www/janus/env/config"
	"github.com/qbox/www/janus/service/account"
	"github.com/sirupsen/logrus"
)

// InitAppEngine Init gin route engine
func InitAppEngine(l *logrus.Logger, cfg *config.Config) *gin.Engine {
	gin.SetMode(string(cfg.Server.Mode))
	app := gin.New()
	store, err := redis.NewStore(
		cfg.Redis.Size,
		cfg.Redis.Networt,
		cfg.Redis.Addrs[0],
		cfg.Redis.Password,
		[]byte("develop-www"),
	)
	if err != nil {
		l.Errorf("<appengine.InitAppEngine> redis.NewStore() failed, err: %s.", err)
		return app
	}
	store.Options(sessions.Options{MaxAge: cfg.Session.MaxAge})

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
