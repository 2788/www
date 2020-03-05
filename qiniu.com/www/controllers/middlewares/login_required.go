package middlewares

import (
	"fmt"

	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"qiniu.com/www/controllers"
	"qiniu.com/www/service/account"
)

type SSOLogin struct {
	controllers.Base
	SSOService account.SSOService
}

func NewSSOController(service account.SSOService) *SSOLogin {
	return &SSOLogin{
		SSOService: service,
	}
}

func (s *SSOLogin) LoginRequired(ctx *gin.Context) {
	var (
		pass  bool
		query = s.SSOService.BuildLoginURL()
	)

	defer func() {
		if !pass {
			location := fmt.Sprintf("%s/?%s", query.Get("redirect"), query.Encode())
			http.Redirect(s.Rw, s.Req, location, http.StatusFound)
		} else {
			ctx.Next()
		}
	}()

	ssid, err := s.Req.Cookie("SSID")
	if err != nil || ssid == nil {
		return
	}

	// 从 session 中获取 ssid
	session := sessions.Default(ctx)
	sessionSsid := session.Get("SSID")

	cookieSsid, _, ok := s.SSOService.SSODecodeCookieValue(ssid.Value)
	if !ok || cookieSsid == "" {
		logrus.Errorf("<SSOLogin.LoginRequired> SSODecodeCookieValue(%s) failed, err:%s.", ssid.Value, err)
		return
	}

	if sessionSsid != nil && sessionSsid == cookieSsid {
		pass = true
		return
	}

	ssoInfo, err := s.SSOService.UidBySid(cookieSsid)
	if err != nil {
		logrus.Errorf("<SSOLogin.LoginRequired> SSOService.UidBySid(%s) failed, err:%s.", cookieSsid, err)
		return
	}
	session.Set("SSID", cookieSsid)
	session.Set("uid", ssoInfo.Uid)
	pass = true
}
