package trade

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/code"
	"github.com/qbox/www/janus/controllers"
	"github.com/qbox/www/janus/service/gaea"
)

type Trade struct {
	gaeaService gaea.GaeaAdminService
}

func NewTradeHandler(gaeaService gaea.GaeaAdminService) *Trade {
	return &Trade{
		gaeaService: gaeaService,
	}
}

func (s *Trade) PackageBuy(ctx *gin.Context) {
	var param gaea.ReqPackageBuy

	err := ctx.BindJSON(&param)
	if err != nil || param.PackageID <= 0 || param.Quantity <= 0 || param.BuyerID == 0 {
		controllers.RespErr(ctx, code.InvalidArgs, nil)
		return
	}

	if param.Memo == "" {
		param.Memo = fmt.Sprintf("trade from marketing, packageId:%d", param.PackageID)
	}

	orderHashes, err := s.gaeaService.PackageBuy(param)
	if err != nil {
		// TODO trade 的报错，可以细化处理一下，知道具体购买失败原因
		controllers.RespErr(ctx, code.ResultError, err, "package buy failed")
		return
	}
	controllers.RespOk(ctx, orderHashes)
	return
}

func (s *Trade) OrderNew(ctx *gin.Context) {
	var param gaea.ReqOrderNew
	err := ctx.BindJSON(&param)
	if err != nil || param.BuyerId == 0 || len(param.Orders) == 0 {
		controllers.RespErr(ctx, code.InvalidArgs, nil)
		return
	}
	if param.Memo == "" {
		var productIDs string
		for i, product := range param.Orders {
			if i == 0 {
				productIDs = fmt.Sprintf("%d", product.ProductId)
			} else {
				productIDs = fmt.Sprintf("%s-%d", productIDs, product.ProductId)
			}
		}

		param.Memo = fmt.Sprintf("trade from marketing, product:%s", productIDs)
	}

	orderHash, err := s.gaeaService.OrderNew(param)
	if err != nil {
		// TODO trade 的报错，可以细化处理一下，知道具体购买失败原因
		controllers.RespErr(ctx, code.ResultError, err, "order new failed")
		return
	}
	controllers.RespOk(ctx, orderHash)
	return
}
