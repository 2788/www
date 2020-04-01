package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/code"
	"github.com/qbox/www/janus/controllers/middlewares"
)

type Response struct {
	Code    code.Code   `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// RespError response error info
func RespErr(ctx *gin.Context, httpCode int, bizCode code.Code, err error, msgs ...string) {
	if err != nil {
		middlewares.GetLogger(ctx).Error(err)
	}

	res := Response{
		Code:    bizCode,
		Message: bizCode.Humanize(),
	}
	if len(msgs) > 0 {
		res.Message = msgs[0]
	}

	ctx.JSON(httpCode, res)
}

// RespOK response ok info
func RespOk(ctx *gin.Context, data interface{}) {
	ctx.JSON(http.StatusOK, Response{
		Code:    code.OK,
		Message: code.OK.Humanize(),
		Data:    data,
	})
}
