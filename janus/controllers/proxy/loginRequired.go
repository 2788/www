package proxy

import (
	"errors"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

const SESSION_SSID = "SSID"
const SESSION_UID = "uid"

func LoginRequiredFilter(proxy *Proxy, ctx *gin.Context) (bool, error) {

	var pass bool

	ssid, err := ctx.Request.Cookie(SESSION_SSID)
	if err != nil || ssid == nil {
		logrus.Errorf("<SSOLogin.LoginRequired> ctx.Request.Cookie(%s) failed, err:%s, ssid: %s.", SESSION_SSID, err, ssid)
		return pass, err
	}

	// 从 session 中获取 ssid
	session := sessions.Default(ctx)
	sessionSsid := session.Get(SESSION_SSID)

	cookieSsid, _, ok := proxy.ssoService.SSODecodeCookieValue(ssid.Value)
	if !ok || cookieSsid == "" {
		logrus.Errorf("<SSOLogin.LoginRequired> SSODecodeCookieValue(%s) failed, cookieSsid:%s, ok: %t.", ssid.Value, cookieSsid, ok)
		err = errors.New("ssoDecodeCookieValue failed.")
		return pass, err
	}

	// 用户已登录
	if sessionSsid != nil && sessionSsid == cookieSsid {
		pass = true
		return pass, nil
	}

	ssoInfo, err := proxy.ssoService.UidBySid(cookieSsid)
	if err != nil {
		logrus.Errorf("<SSOLogin.LoginRequired> SSOService.UidBySid(%s) failed, err:%s.", cookieSsid, err)
		return pass, err
	}
	session.Set(SESSION_SSID, cookieSsid)
	session.Set(SESSION_UID, ssoInfo.Uid)
	pass = true

	return pass, nil
}
