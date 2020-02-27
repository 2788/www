package user

import (
	"github.com/gin-contrib/sessions"
	"qiniu.com/www/service/account"
	"qiniu.com/www/utils"
	"qiniu.com/www/utils/oauth"
)

func SetAuthToSession(sess sessions.Session, info *account.AccInfo, token *oauth.Token) error {
	sess.Set(oauth.LoginUid, info.Uid)
	sess.Set(oauth.LoginToken, token.AccessToken)
	sess.Set(oauth.LoginRefresh, token.RefreshToken)
	sess.Set(oauth.LoginExpired, token.TokenExpiry)
	sess.Set(oauth.LoginUtype, utils.ToStr(info.Utype))

	// TODO set psk to session
	return nil
}
