package middlewares

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v7"
	"github.com/qiniu/xlog.v1"

	"qiniu.com/www/admin-backend/service/counter"
	"qiniu.com/www/admin-backend/utils"
)

// IPBasedRateLimiter 用于限制一定时间内同一个 ip 对接口的请求次数
func IPBasedRateLimiter(redisHost string, limit int, expiration time.Duration) gin.HandlerFunc {
	client := redis.NewUniversalClient(&redis.UniversalOptions{Addrs: strings.Split(redisHost, ",")})
	redisCounterService := counter.NewRedisCounterService(client)
	return func(ctx *gin.Context) {
		logger := xlog.NewWithReq(ctx.Request)

		path := ctx.Request.URL.Path
		ip := utils.RequestRealIp(ctx.Request)
		key := fmt.Sprintf("%s:%s:%s", utils.RedisKeyPrefix, path, ip)

		c := redisCounterService.Create(key, limit, expiration)
		err := c.Increase(1)
		if err != nil {
			logger.Errorf("Increase(%s) error: %v", key, err)
			if err == counter.LimitReachedError {
				ctx.JSON(http.StatusTooManyRequests, gin.H{
					"code":    http.StatusTooManyRequests,
					"message": http.StatusText(http.StatusTooManyRequests)})
			} else {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"code":    http.StatusInternalServerError,
					"message": "IPBasedRateLimiter increase error"})
			}
			ctx.Abort()
			return
		}
	}
}
