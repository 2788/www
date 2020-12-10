package routes

import (
	"github.com/gin-gonic/gin"
	"qiniu.com/rmb-web/admin-backend/pkg/app"

	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/controllers"
)

func InitCustomRoutes(r *gin.Engine, conf *config.Config) {
	activCtl := controllers.NewActivity(conf)

	mongo := r.Group("/api/www", app.ParseAuthMiddleware(&conf.Config), app.AdminCheck())
	{
		mongo.POST("/activity-registration", activCtl.ActivityRegistration)
	}
}
