package gaea

import (
    "qiniu.com/www/service/account"
    "github.com/sirupsen/logrus"
)

type (
    GaeaAdminService interface {}
    gaeaAdminService struct {
        host   string
        client *account.Client
        logger logrus.FieldLogger
    }
)

func NewGaeaAdminService(host string, client *account.Client, logger logrus.FieldLogger) GaeaAdminService {
    return &gaeaAdminService{
        host:   host,
        client: client,
        logger: logger,
    }
}
