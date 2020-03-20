package middlewares

import (
	"fmt"

	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/service/account"
	"github.com/sirupsen/logrus"
)

type SSOLogin struct {
	SSOService account.SSOService
}

const SESSION_SSID = "SSID"
const SESSION_UID = "uid"

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
			ctx.Redirect(http.StatusFound, location)
		} else {
			ctx.Next()
		}
	}()

	ssid, err := ctx.Request.Cookie(SESSION_SSID)
	if err != nil || ssid == nil {
		logrus.Errorf("<SSOLogin.LoginRequired> ctx.Request.Cookie(%s) failed, err:%s, ssid: %s.", SESSION_SSID, err, ssid)
		return
	}

	// 从 session 中获取 ssid
	session := sessions.Default(ctx)
	sessionSsid := session.Get(SESSION_SSID)

	cookieSsid, _, ok := s.SSOService.SSODecodeCookieValue(ssid.Value)
	if !ok || cookieSsid == "" {
		logrus.Errorf("<SSOLogin.LoginRequired> SSODecodeCookieValue(%s) failed, cookieSsid:%s, ok: %t.", ssid.Value, cookieSsid, ok)
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
	session.Set(SESSION_SSID, cookieSsid)
	session.Set(SESSION_UID, ssoInfo.Uid)
	pass = true
}
