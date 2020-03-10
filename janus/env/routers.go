package env

import (
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/controllers/coupon"
	"github.com/qbox/www/janus/controllers/middlewares"
)

func InitRouters(app *gin.Engine) {
	ssoCtrl := middlewares.NewSSOController(env.SSOService)
	couponHandler := coupon.NewCouponHandler(env.GaeaAdminService)

	v1 := app.Group("/marketing")
	{
		v1.Use(ssoCtrl.LoginRequired)

		coupon := v1.Group("/coupon")
		coupon.POST("/bind", couponHandler.BindCampaignsCouponByBatchID)
	}

}
