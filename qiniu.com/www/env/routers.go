package env

import (
	"github.com/gin-gonic/gin"
	"qiniu.com/www/controllers/middlewares"
	"qiniu.com/www/controllers/user"
)

func InitRouters(app *gin.Engine) {

	userCtrl := user.NewUserController(env.AccAdminService, env.GaeaAdminService)

	v1 := app.Group("/v1")
	{
		r := v1.Group("/user")

		r.GET("/signin", userCtrl.SignIn)
	}
	{
		app.Use(middlewares.TokenAuth([]byte(env.Cfg.Auth.SecretKey), env.Cfg.Auth.MockToken))
		// TODO  路由细化分类
	}
}
