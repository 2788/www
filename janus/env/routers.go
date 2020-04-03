package env

import (
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/controllers/proxy"
)

func InitRouters(app *gin.Engine) {
	proxyHandler := proxy.NewProxyHandler(Global.AccTr, Global.ProxyCfg, Global.SSOService, Global.Logger)

	proxy := app.Group("/api/proxy")
	{
		proxy.Any("/*proxy", proxyHandler.HandleProxyRequest)
	}

}
