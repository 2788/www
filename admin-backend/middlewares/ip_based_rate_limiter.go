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
// todo: 因为目前是只要请求一次则会计数一次，并不依赖请求结果，如遇到业务场景需要根据请求结果来判断是否计数则需要重新考虑该中间件的实现
func IPBasedRateLimiter(redisHost string, limit int, expiration time.Duration) gin.HandlerFunc {
	client := redis.NewUniversalClient(&redis.UniversalOptions{Addrs: strings.Split(redisHost, ",")})
	redisCounterService := counter.NewRedisCounterService(client)
	return func(ctx *gin.Context) {
		logger := xlog.NewWithReq(ctx.Request)

		path := ctx.Request.URL.Path
		ip, err := utils.RequestRealIp(ctx.Request)
		if err != nil {
			logger.Errorf("RequestRealIp error: %v", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"code":    http.StatusInternalServerError,
				"message": http.StatusText(http.StatusInternalServerError)})
			ctx.Abort()
			return
		}

		key := fmt.Sprintf("%s:%s:%s", utils.RedisKeyPrefix, path, ip)

		c := redisCounterService.Create(key, limit, expiration)
		err = c.Increase(1)
		if err != nil {
			logger.Errorf("Increase(%s) error: %v", key, err)
			if err == counter.LimitReachedError {
				ctx.JSON(http.StatusTooManyRequests, gin.H{
					"code":    http.StatusTooManyRequests,
					"message": http.StatusText(http.StatusTooManyRequests)})
			} else {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"code":    http.StatusInternalServerError,
					"message": http.StatusText(http.StatusInternalServerError)})
			}
			ctx.Abort()
			return
		}
	}
}
