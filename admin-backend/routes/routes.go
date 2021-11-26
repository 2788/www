package routes

import (
	"time"

	"github.com/gin-gonic/gin"

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

	g := r.Group("/api/www")
	{
		g.POST("/activity-registration", activCtl.ActivityRegistration)
		g.POST("/activity-checkin", activCtl.CheckIn)
		g.POST("/consult/text-process", consultCtl.TextProcess)
		g.POST("/verification/sms/send",
			middlewares.IPBasedRateLimiter(conf.RedisHosts, 5, 1*time.Minute),
			verificationCtl.SendSMS)
	}

	return nil
}
