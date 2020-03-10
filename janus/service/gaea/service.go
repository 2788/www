package gaea

import (
	"github.com/qbox/www/janus/service/account"
	"github.com/sirupsen/logrus"
)

type (
	GaeaAdminService interface {
		BindCampaignsCouponByBatchID(param BindCouponInput) error
	}
	gaeaAdminService struct {
		host   string
		client *account.Client
		logger logrus.FieldLogger
	}
)

var _ GaeaAdminService = &gaeaAdminService{}

func NewGaeaAdminService(host string, client *account.Client, logger logrus.FieldLogger) GaeaAdminService {
	return &gaeaAdminService{
		host:   host,
		client: client,
		logger: logger,
	}
}
