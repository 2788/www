package gaea

import (
	"errors"
	"fmt"
)

type BindCouponInput struct {
	UID     uint64 `json:"uid"`
	BatchID uint64 `json:"batch_id"`
}

func (s *gaeaAdminService) BindCampaignsCouponByBatchID(param BindCouponInput) error {
	var (
		api  = fmt.Sprintf("%s/api/marketing/event/coupon/bind", s.host)
		resp ApiResultBase
	)

	err := s.client.CallWithJson(s.logger, &resp, api, param)
	if err != nil {
		s.logger.Errorf("<gaeaAdminService.BindCampaignsCouponByBatchID> CallWithJson() failed, api:%s, param: %+v, err:%s.", api, param, err)
		return err
	} else if !resp.OK() {
		err = errors.New(resp.Msg)
		s.logger.Errorf("<gaeaAdminService.BindCampaignsCouponByBatchID> resp not ok, err:%s.", err)
		return err
	}
	return nil
}
