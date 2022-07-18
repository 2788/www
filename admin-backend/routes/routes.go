package routes

import (
	"time"

	"github.com/gin-gonic/gin"
	"qiniu.com/rmb-web/admin-backend/pkg/app"

	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/controllers"
	"qiniu.com/www/admin-backend/controllers/verification"
	"qiniu.com/www/admin-backend/middlewares"
)

func InitCustomRoutes(r *gin.Engine, conf *config.Config) error {
	activCtl := controllers.NewActivity(conf)
	consultCtl, err := controllers.NewConsult(conf)
	verificationCtl := verification.NewVerification(conf)
	if err != nil {
		return err
	}
	refresherCtl := controllers.NewRefresher(conf)

	wwwGroup := r.Group("/api/www")
	{
		// 活动报名接口并未做手机号上次验证时间检查，业务上可以接受通过直接请求活动报名接口跳过手机号验证
		wwwGroup.POST("/activity-registration", activCtl.ActivityRegistration)
		wwwGroup.POST("/activity-checkin", activCtl.CheckIn)
		wwwGroup.POST("/consult/text-process", consultCtl.TextProcess)
		wwwGroup.POST("/verification/sms/verify", verificationCtl.VerifySMS)
		wwwGroup.POST("/verification/sms/send",
			middlewares.IPBasedRateLimiter(conf.RedisHosts, 5, 1*time.Minute),
			verificationCtl.SendSMS)

		checkedGroup := wwwGroup.Use(app.LoginCheckMiddleware(&conf.Config), app.PermissionCheckMiddleware())
		checkedGroup.POST("/refresh/prefix", refresherCtl.PrefixRefresh)
		checkedGroup.POST("/refresh", refresherCtl.Refresh)
	}
	refresherGroup := r.Group("/api/refresher")
	{
		checkedGroup := refresherGroup.Use(app.ParseAuthMiddleware(&conf.Config), app.AdminCheck())
		checkedGroup.POST("/refresh", refresherCtl.Refresh)
		checkedGroup.POST("/refresh/prefix", refresherCtl.PrefixRefresh)
	}

	return nil
}
