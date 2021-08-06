package routes

import (
	"github.com/gin-gonic/gin"

	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/controllers"
)

func InitCustomRoutes(r *gin.Engine, conf *config.Config) error {
	activCtl := controllers.NewActivity(conf)
	consultCtl, err := controllers.NewConsult(conf)
	if err != nil {
		return err
	}

	g := r.Group("/api/www")
	{
		g.POST("/activity-registration", activCtl.ActivityRegistration)
		g.POST("/activity-checkin", activCtl.CheckIn)
		g.POST("/consult/text-process", consultCtl.TextProcess)
	}

	return nil
}
