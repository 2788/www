package main

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/qiniu/x/log"

	"qiniu.com/www/search/config"
	"qiniu.com/www/search/controllers"
	"qiniu.com/www/search/middlewares"
	"qiniu.com/www/search/routes"
	"qiniu.com/www/search/utils"
)

func main() {
	err := config.Init("config.yml")
	utils.Must(err)

	logLevel := getLoggerLevel()
	log.Std.SetOutputLevel(logLevel)

	gin.SetMode(getGinMode())

	c, err := controllers.New()
	utils.Must(err)

	r := gin.New()
	r.Use(
		gin.Recovery(),
		middlewares.GetLogReqMiddleware(),
	)

	routes.InitRouter(r, c)

	r.Run(":" + strconv.Itoa(config.Conf.Server.Port))
}

func getGinMode() string {
	switch config.Conf.Server.Mode {
	case config.DevMode:
		return gin.DebugMode
	case config.TestMode:
		return gin.TestMode
	case config.ProdMode:
		return gin.ReleaseMode
	default:
		return gin.DebugMode
	}
}

func getLoggerLevel() int {
	switch config.Conf.Server.Mode {
	case "dev":
		return log.Ldebug
	default:
		return log.Linfo
	}
}
