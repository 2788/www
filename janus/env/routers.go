package env

import (
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/controllers/middlewares"
)

func InitRouters(app *gin.Engine) {
	ssoCtrl := middlewares.NewSSOController(env.SSOService)

	v1 := app.Group("/v1")
	{
		v1.Use(ssoCtrl.LoginRequired)
		// TODO
	}

}
