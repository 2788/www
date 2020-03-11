package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/code"
	"github.com/qbox/www/janus/controllers/middlewares"
)

func RespOk(ctx *gin.Context, data interface{}) {
	ctx.JSON(code.OK.Code(), data)
}

func RespErr(ctx *gin.Context, bizCode code.Code, err error, msgs ...string) {
	var msg string
	if err != nil {
		middlewares.GetLogger(ctx).Error(err)
	}

	if len(msgs) > 0 {
		msg = msgs[0]
	} else {
		msg = bizCode.Humanize()
	}

	ctx.JSON(bizCode.Code(), msg)
}
