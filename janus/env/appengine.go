package env

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	pacc "github.com/qbox/pay-sdk/base/account"
	"github.com/qbox/www/janus/controllers/middlewares"
	"github.com/qbox/www/janus/env/config"
	"github.com/qbox/www/janus/service/account"
	"github.com/qbox/www/janus/service/gaea"
	"github.com/sirupsen/logrus"
)

// InitAppEngine Init gin route engine
func InitAppEngine(l *logrus.Logger, cfg *config.Config, proxyCfg []config.ProxyEntry) *gin.Engine {
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

	accTr, err := pacc.NewTransport(&pacc.AccConfig{
		Host:     cfg.Acc.Host,
		UserName: cfg.Acc.Username,
		Password: cfg.Acc.Password,
	})
	if err != nil {
		l.Errorf("<appengine.InitAppEngine> NewTransport() failed, err:%s.", err)
		return app
	}

	ssoService := initAccSSOService(cfg, accTr)
	gaeaService := initGaeaService(cfg.Services.GaeaHost, accTr, l)

	Global.Cfg = cfg
	Global.SSOService = ssoService
	Global.GaeaAdminService = gaeaService
	Global.AccTr = accTr
	Global.ProxyCfg = proxyCfg
	Global.Logger = l
	return app
}

func initAccSSOService(cfg *config.Config, accTr http.RoundTripper) account.SSOService {
	return account.NewSSOService(
		cfg.SSO.Host,
		cfg.SSO.ClientId,
		cfg.SSO.CookieSecret,
		accTr)
}

func initGaeaService(host string, adminTr http.RoundTripper, logger logrus.FieldLogger) gaea.GaeaAdminService {
	client := &account.Client{&http.Client{Transport: adminTr}}
	return gaea.NewGaeaAdminService(host, client, logger)
}
