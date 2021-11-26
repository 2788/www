module qiniu.com/www/admin-backend

go 1.13

require (
	github.com/gin-gonic/gin v1.6.3
	github.com/go-redis/redis/v7 v7.4.0
	github.com/qiniu/rpc.v1 v0.0.0
	github.com/qiniu/rpc.v1/lb.v2.1 v0.0.0
	github.com/qiniu/xlog.v1 v0.0.0
	github.com/tencentcloud/tencentcloud-sdk-go v1.0.80
	gopkg.in/mgo.v2 v2.0.0-20190816093944-a6b53ec6cb22
	gopkg.in/yaml.v2 v2.4.0
	qbox.us/api/message v0.0.0
	qbox.us/api/message/code v0.0.0 // indirect
	qiniu.com/rmb-web/admin-backend v0.0.9
	qiniu.com/rmb-web/admin-backend/mongo-api v0.0.2
	qiniu.com/rmb-web/puck/v3 v3.2.0
	qbox.us/verifycode v0.0.0
)

replace qiniu.com/rmb-web/admin-backend v0.0.9 => github.com/qbox/rmb-web/admin-backend v0.0.9

replace qiniu.com/rmb-web/admin-backend/mongo-api v0.0.2 => github.com/qbox/rmb-web/admin-backend/pkg/mongo-api v0.0.2

replace qiniu.com/rmb-web/puck/v3 v3.2.0 => github.com/qbox/rmb-web/puck/v3 v3.2.0

replace code.google.com/p/go.net/context v0.0.0 => ../../base/com/src/code.google.com/p/go.net/context

replace github.com/facebookgo/clock v0.0.0 => ../../base/com/src/github.com/facebookgo/clock

replace github.com/facebookgo/httpdown v0.0.0 => ../../base/com/src/github.com/facebookgo/httpdown

replace github.com/facebookgo/stats v0.0.0 => ../../base/com/src/github.com/facebookgo/stats

replace github.com/kavu/go_reuseport v0.0.0 => ../../base/com/src/github.com/kavu/go_reuseport

replace github.com/qiniu/api/auth/digest v0.0.0 => ../../base/qiniu/src/github.com/qiniu/api/auth/digest

replace github.com/qiniu/api/conf v0.0.0 => ../../base/qiniu/src/github.com/qiniu/api/conf

replace qiniu.com/auth/qboxmac.v1 v0.0.0 => ../../base/qiniu/src/qiniu.com/auth/qboxmac.v1

replace qiniu.com/auth/qiniumac.v1 v0.0.0 => ../../base/qiniu/src/qiniu.com/auth/qiniumac.v1

replace qbox.us/rateio v0.0.0 => ../../base/com/src/qbox.us/rateio

replace qbox.us/ratelimit v0.0.0 => ../../base/com/src/qbox.us/ratelimit

replace qbox.us/rpc v0.0.0 => ../../base/com/src/qbox.us/rpc

replace qbox.us/servestk v0.0.0 => ../../base/com/src/qbox.us/servestk

replace qbox.us/servestk/logh v0.0.0 => ../../base/com/src/qbox.us/servestk/logh

replace qbox.us/admin_api/account.v2 v0.0.0 => ../../base/biz/src/qbox.us/admin_api/account.v2

replace qbox.us/api/account v0.0.0 => ../../base/biz/src/qbox.us/api/account

replace qbox.us/api/account.v2 v0.0.0 => ../../base/biz/src/qbox.us/api/account.v2

replace qbox.us/api/one/access v0.0.0 => ../../base/biz/src/qbox.us/api/one/access

replace qbox.us/mockacc v0.0.0 => ../../base/biz/src/qbox.us/mockacc

replace qbox.us/api/message v0.0.0 => ../../base/biz/src/qbox.us/api/message

replace qbox.us/api/message/code v0.0.0 => ../../base/biz/src/qbox.us/api/message/code

replace qbox.us/servend/account v0.0.0 => ../../base/biz/src/qbox.us/servend/account

replace qbox.us/servend/oauth v0.0.0 => ../../base/biz/src/qbox.us/servend/oauth

replace qbox.us/servend/proxy_auth v0.0.0 => ../../base/biz/src/qbox.us/servend/proxy_auth

replace github.com/teapots/teapot v0.0.0 => ../../base/portal/src/github.com/teapots/teapot

replace qbox.us/biz/services.v2/account v0.0.0 => ../../base/portal/src/qbox.us/biz/services.v2/account

replace qbox.us/biz/utils.v2/log v0.0.0 => ../../base/portal/src/qbox.us/biz/utils.v2/log

replace labix.org/v2/mgo/bson v0.0.0 => ../../base/com/src/labix.org/v2/mgo/bson

replace launchpad.net/gocheck v0.0.0 => ../../base/com/src/launchpad.net/gocheck

replace qbox.us/api v0.0.0 => ../../base/com/src/qbox.us/api

replace qbox.us/cc v0.0.0 => ../../base/com/src/qbox.us/cc

replace qbox.us/cc/config v0.0.0 => ../../base/com/src/qbox.us/cc/config

replace qbox.us/cc/time v0.0.0 => ../../base/com/src/qbox.us/cc/time

replace qbox.us/digest_auth v0.0.0 => ../../base/com/src/qbox.us/digest_auth

replace qbox.us/errors v0.0.0 => ../../base/com/src/qbox.us/errors

replace qbox.us/multipart v0.0.0 => ../../base/com/src/qbox.us/multipart

replace qbox.us/net/httputil v0.0.0 => ../../base/com/src/qbox.us/net/httputil

replace qbox.us/net/httputil/bytes v0.0.0 => ../../base/com/src/qbox.us/net/httputil/bytes

replace qbox.us/net/uri v0.0.0 => ../../base/com/src/qbox.us/net/uri

replace qbox.us/oauth v0.0.0 => ../../base/com/src/qbox.us/oauth

replace github.com/qiniu/bytes v0.0.0 => ../../base/qiniu/src/github.com/qiniu/bytes

replace github.com/qiniu/bytes/seekable v0.0.0 => ../../base/qiniu/src/github.com/qiniu/bytes/seekable

replace github.com/qiniu/errors v0.0.0 => ../../base/qiniu/src/github.com/qiniu/errors

replace github.com/qiniu/http/formutil.v1 v0.0.0 => ../../base/qiniu/src/github.com/qiniu/http/formutil.v1

replace github.com/qiniu/http/httputil.v1 v0.0.0 => ../../base/qiniu/src/github.com/qiniu/http/httputil.v1

replace github.com/qiniu/http/misc/strconv v0.0.0 => ../../base/qiniu/src/github.com/qiniu/http/misc/strconv

replace github.com/qiniu/http/misc/types v0.0.0 => ../../base/qiniu/src/github.com/qiniu/http/misc/types

replace github.com/qiniu/io v0.0.0 => ../../base/qiniu/src/github.com/qiniu/io

replace github.com/qiniu/io/crc32util v0.0.0 => ../../base/qiniu/src/github.com/qiniu/io/crc32util

replace github.com/qiniu/log.v1 v0.0.0 => ../../base/qiniu/src/github.com/qiniu/log.v1

replace github.com/qiniu/rpc.v1 v0.0.0 => ../../base/qiniu/src/github.com/qiniu/rpc.v1

replace github.com/qiniu/rpc.v1/lb.v2.1 v0.0.0 => ../../base/qiniu/src/github.com/qiniu/rpc.v1/lb.v2.1

replace github.com/qiniu/ts v0.0.0 => ../../base/qiniu/src/github.com/qiniu/ts

replace github.com/qiniu/xlog.v1 v0.0.0 => ../../base/qiniu/src/github.com/qiniu/xlog.v1

replace qiniu.com/auth/proto.v1 v0.0.0 => ../../base/qiniu/src/qiniu.com/auth/proto.v1

replace qiniupkg.com/x/url.v7 v0.0.0 => ../../base/qiniu/src/qiniupkg.com/x/url.v7

replace qbox.us/account-api v0.0.0 => ../../base/account-api/src/qbox.us/account-api

replace github.com/teapots/inject v0.0.0 => ../../base/portal/src/github.com/teapots/inject

replace qbox.us/qconf/qconfapi v0.0.0 => ../../base/biz/src/qbox.us/qconf/qconfapi

replace qiniu.com/auth v0.0.0 => ../../base/qiniu/src/qiniu.com/auth

replace qiniu.com/auth/account.v1 v0.0.0 => ../../base/qiniu/src/qiniu.com/auth/account.v1

replace github.com/qiniu/rpc.v1/brpc/lb.v2.1 v0.0.0 => ../../base/qiniu/src/github.com/qiniu/rpc.v1/brpc/lb.v2.1

replace qbox.us/api/qconf/akg v0.0.0 => ../../base/biz/src/qbox.us/api/qconf/akg

replace qbox.us/api/qconf/uidg v0.0.0 => ../../base/biz/src/qbox.us/api/qconf/uidg

replace qbox.us/audit/logh v0.0.0 => ../../base/com/src/qbox.us/audit/logh

replace qbox.us/limit v0.0.0 => ../../base/com/src/qbox.us/limit

replace qbox.us/limit/keycount v0.0.0 => ../../base/com/src/qbox.us/limit/keycount

replace qiniu.com/auth/signer.v1 v0.0.0 => ../../base/qiniu/src/qiniu.com/auth/signer.v1

replace qiniu.com/auth/authutil.v1 v0.0.0 => ../../base/qiniu/src/qiniu.com/auth/authutil.v1

replace github.com/qiniu/rpc.v1/lb.v2.1/transport v0.0.0 => ../../base/qiniu/src/github.com/qiniu/rpc.v1/lb.v2.1/transport

replace labix.org/v2/mgo v0.0.0 => ../../base/com/src/labix.org/v2/mgo

replace qbox.us/biz/component/providers/account/auth v0.0.0 => ../../base/portal/src/qbox.us/biz/component/providers/account/auth

replace qbox.us/verifycode v0.0.0 => ../../base/com/src/qbox.us/verifycode