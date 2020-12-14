package routes

import (
	"github.com/gin-gonic/gin"

	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/controllers"
)

func InitCustomRoutes(r *gin.Engine, conf *config.Config) {
	activCtl := controllers.NewActivity(conf)

	mongo := r.Group("/api/www")
	{
		mongo.POST("/activity-registration", activCtl.ActivityRegistration)
	}
}
