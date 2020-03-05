package env

import (
	"github.com/gin-gonic/gin"
	"qiniu.com/www/controllers/user"
)

func InitRouters(app *gin.Engine) {
	ssoCtrl := user.NewSSOController(env.SSOService)

	v1 := app.Group("/v1")
	{
		r := v1.Group("/sso")

		r.GET("/signin", ssoCtrl.SignIn)
	}

}
