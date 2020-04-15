package env

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	"github.com/go-openapi/strfmt"
	pacc "github.com/qbox/pay-sdk/base/account"
	"github.com/qbox/pay-sdk/http/lego/lego"
	legoService "github.com/qbox/pay-sdk/http/lego/lego/lego_service"
	"github.com/sirupsen/logrus"
	"qiniu.com/qbox/www/janus/controllers/middlewares"
	"qiniu.com/qbox/www/janus/env/config"
	"qiniu.com/qbox/www/janus/service/account"
	"qiniu.com/qbox/www/janus/utils/transport"
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
		[]byte(cfg.Redis.KeyPairs),
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

	Global.Cfg = cfg
	Global.SSOService = ssoService
	Global.LegoService = initLegoService(cfg.Services.LegoHost)
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

func initLegoService(host string) legoService.ClientService {
	transport := transport.NewClientTransport(host, http.DefaultClient)
	if transport == nil {
		return lego.Default.LegoService
	}

	return lego.New(transport, strfmt.Default).LegoService
}
