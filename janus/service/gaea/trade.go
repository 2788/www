package gaea

import (
	"fmt"

	"errors"
)

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

func (s *gaeaAdminService) OrderNew(param ReqOrderNew) (orderHash string, err error) {
	var (
		api  = fmt.Sprintf("%s/api/order/new", s.host)
		resp struct {
			ApiResultBase
			Data RespOrderNew
		}
	)

	err = s.client.CallWithJson(s.logger, &resp, api, param)
	if err != nil {
		s.logger.Errorf("<gaeaAdminService.OrderNew> CallWithJson() failed, api:%s, param:%+v, err:%s.", api, param, err)
		return
	} else if !resp.OK() {
		err = errors.New(resp.Msg)
		s.logger.Errorf("<gaeaAdminService.OrderNew> resp not ok, err:%s.", err)
		return
	}

	orderHash = resp.Data.OrderHash
	return
}
