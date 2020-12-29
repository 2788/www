package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/qiniu/rpc.v1/lb.v2.1"

	"qiniu.com/www/admin-backend/codes"
)

type ErrorBody struct {
	Code    int    `json:"code"`
	Message string `json:"message,omitempty"`
}

func SendResponse(ctx *gin.Context, code codes.Code, data interface{}) {
	ctx.Header("Content-Type", "application/json; charset=UTF-8")
	if code.Code()/200 == 1 {
		ctx.JSON(code.Code(), data)
		return
	}

	httpCode := 500
	switch {
	case code.Code() < 1000:
		httpCode = code.Code()
	case code.Code() > 100000:
		httpCode = getTopThreeNum(code.Code())
	}

	message := code.Humanize()
	if data != nil {
		message = fmt.Sprintf("%s, %v", code.Humanize(), data)
	}
	ctx.JSON(httpCode, &ErrorBody{
		Code:    code.Code(),
		Message: message,
	})
}

// getTopThreeNum 获取前三位数字
func getTopThreeNum(num int) int {
	numStr := strconv.Itoa(num)
	resStr := numStr[:3]
	res, err := strconv.Atoi(resStr)
	if err != nil {
		return 500
	}
	return res
}

func NewClient(host string, transport http.RoundTripper) *lb.Client {
	hosts := strings.Split(host, ",")
	cfg := &lb.Config{
		Hosts:    hosts,
		TryTimes: uint32(len(hosts)),
	}
	return lb.New(cfg, transport)
}
