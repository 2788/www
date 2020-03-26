package env

import (
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/controllers/coupon"
	"github.com/qbox/www/janus/controllers/proxy"
	"github.com/qbox/www/janus/controllers/trade"
)

func InitRouters(app *gin.Engine) {
	couponHandler := coupon.NewCouponHandler(Global.GaeaAdminService)
	tradeHandler := trade.NewTradeHandler(Global.GaeaAdminService)
	proxyHandler := proxy.NewProxyHandler(Global.AccTr, Global.ProxyCfg, Global.SSOService, Global.Logger)

	v1 := app.Group("/marketing")
	{
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
		proxy.Any("/*proxy", proxyHandler.ProxyAll)
	}

}
