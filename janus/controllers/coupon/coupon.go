package coupon

import (
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/code"
	"github.com/qbox/www/janus/service/gaea"
)

type Coupon struct {
	gaeaService gaea.GaeaAdminService
}

func NewCouponHandler(gaeaService gaea.GaeaAdminService) *Coupon {
	return &Coupon{
		gaeaService: gaeaService,
	}
}

func (s *Coupon) BindCampaignsCouponByBatchID(ctx *gin.Context) {
	var param gaea.BindCouponInput

	err := ctx.BindJSON(&param)
	if err != nil || param.UID == 0 || param.BatchID == 0 {
		// TODO resp 封装
		ctx.JSON(code.InvalidArgs.Code(), "invalid args")
		return
	}
	err = s.gaeaService.BindCampaignsCouponByBatchID(param)
	if err != nil {
		// TODO ERROR CODE
		ctx.JSON(code.ResultError.Code(), "bind coupon failed")
		return
	}

	return
}
