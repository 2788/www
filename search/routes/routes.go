package routes

import (
	"github.com/gin-gonic/gin"

	"qiniu.com/www/search/controllers"
)

func InitRouter(r *gin.Engine, c *controllers.Controller) {
	r.GET("/search", c.Search)
	r.POST("/fetch", c.Fetch)
	r.GET("/hot", c.HotWords)
}
