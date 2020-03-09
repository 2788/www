package gaea

import (
	"net/http"

	"github.com/sirupsen/logrus"
)

type (
	GaeaAdminService interface{}
	gaeaAdminService struct {
		host   string
		client *http.Client
		logger logrus.FieldLogger
	}
)

func NewGaeaAdminService(host string, client *http.Client, logger logrus.FieldLogger) GaeaAdminService {
	return &gaeaAdminService{
		host:   host,
		client: client,
		logger: logger,
	}
}
