package coupon

import (
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/code"
	"github.com/qbox/www/janus/controllers"
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
		controllers.RespErr(ctx, code.InvalidArgs, nil)
		return
	}
	err = s.gaeaService.BindCampaignsCouponByBatchID(param)
	if err != nil {
		controllers.RespErr(ctx, code.ResultError, err, "bind coupon failed")
		return
	}
	controllers.RespOk(ctx, code.OK.Humanize())
	return
}
