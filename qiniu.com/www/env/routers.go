package env

import (
	"github.com/gin-gonic/gin"
	"qiniu.com/www/controllers/user"
)

func InitRouters(app *gin.Engine) {

	userCtrl := user.NewUserController(env.AccAdminService, env.GaeaAdminService)

	v1 := app.Group("/v1")
	{
		r := v1.Group("/user")

		r.GET("/signin", userCtrl.SignIn)
	}

}
