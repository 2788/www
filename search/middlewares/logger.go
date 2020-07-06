package middlewares

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/qiniu/x/reqid"
	"github.com/qiniu/x/xlog"
)

func GetLogReqMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := reqid.NewContextWith(c, c.Writer, c.Request)
		logger := xlog.NewWith(ctx)

		start := time.Now()
		logger.Infof(
			"[REQ_BEG] %s %s %15s",
			c.Request.Method,
			c.Request.URL.Path,
			c.ClientIP(),
		)

		c.Next()
		logger.Infof(
			"[REQ_END] %3d %v",
			c.Writer.Status(),
			time.Now().Sub(start),
		)
	}
}
