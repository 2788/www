package env

import (
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/controllers/coupon"
	"github.com/qbox/www/janus/controllers/middlewares"
	"github.com/qbox/www/janus/controllers/proxy"
	"github.com/qbox/www/janus/controllers/trade"
)

func InitRouters(app *gin.Engine) {
	ssoCtrl := middlewares.NewSSOController(env.SSOService)
	couponHandler := coupon.NewCouponHandler(env.GaeaAdminService)
	tradeHandler := trade.NewTradeHandler(env.GaeaAdminService)
	proxyHandler := proxy.NewTrandeHandler(env.AccTr)

	v1 := app.Group("/marketing")
	{
		v1.Use(ssoCtrl.LoginRequired)
		{
			coupon := v1.Group("/coupon")
			coupon.POST("/bind", couponHandler.BindCampaignsCouponByBatchID)
		}
		{
			trade := v1.Group("/package")
			trade.POST("/buy", tradeHandler.PackageBuy)
		}
		{
			trade := v1.Group("/order")
			trade.POST("/new", tradeHandler.OrderNew)
		}
	}

	proxy := app.Group("/api/proxy")
	{
		// TODO routers
		proxy.Any("/lego/banners/:id", proxyHandler.ProxyAll)
	}

}
