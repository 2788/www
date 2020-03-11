package gaea

import (
	"fmt"

	"errors"

	"github.com/qbox/www/janus/service/gaea/enums"
)

type ReqPackageBuy struct {
	PackageID  int64            `json:"package_id"`
	Quantity   uint             `json:"quantity"`
	BuyerID    uint32           `json:"buyer_id"`
	Memo       string           `json:"memo"`
	EffectType enums.EffectType `json:"effect_type"`
}
type RespPackageBuy struct {
	OrderHashes []string `json:"order_hashes"`
}

func (s *gaeaAdminService) PackageBuy(param ReqPackageBuy) (orderHashes []string, err error) {
	var (
		api  = fmt.Sprintf("%s/api/package/buy", s.host)
		resp struct {
			ApiResultBase
			Data RespPackageBuy `json:"data"`
		}
	)

	err = s.client.CallWithJson(s.logger, &resp, api, param)
	if err != nil {
		s.logger.Errorf("<gaeaAdminService.PackageBuy> CallWithJson() failed, api:%s, param:%+v, err:%s.", api, param, err)
		return
	} else if !resp.OK() {
		err = errors.New(resp.Msg)
		s.logger.Errorf("<gaeaAdminService.PackageBuy> resp not ok, err:%s.", err)
		return
	}

	orderHashes = resp.Data.OrderHashes
	return
}
