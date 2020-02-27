package middlewares

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	tokenUtil "qiniu.com/www/utils/token"
)

const (
	ctxKeyToken    = "token"
	headerKeyToken = "Authorization"
)

// TokenAuth middleware to auth token
func TokenAuth(secretKey []byte, isMock bool) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		token := strings.TrimPrefix(ctx.GetHeader(headerKeyToken), "Bearer ")
		token = strings.TrimSpace(token)
		var payload *tokenUtil.Payload

		if isMock {
			payload = &tokenUtil.Payload{
				UserID: token,
			}
		} else {
			payload, _ = tokenUtil.DecodeToken(token, secretKey)
			if payload == nil || payload.UserID == "" || payload.IsExpired() {
				// TODO code报错处理
				ctx.JSON(http.StatusUnauthorized, "unauthorized")

				ctx.Abort()
				return
			}
		}

		ctx.Set(ctxKeyToken, payload)
		ctx.Next()
	}
}

// GetTokenPayload 用于获取 ctx 中的 token payload
func GetTokenPayload(ctx *gin.Context) *tokenUtil.Payload {
	return ctx.MustGet(ctxKeyToken).(*tokenUtil.Payload)
}
