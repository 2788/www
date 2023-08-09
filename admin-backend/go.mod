module qiniu.com/www/admin-backend

go 1.17

require (
	github.com/gin-gonic/gin v1.6.3
	github.com/go-redis/redis/v7 v7.4.0
	github.com/qiniu/go-sdk/v7 v7.13.0
	github.com/qiniu/rpc.v1 v0.0.0
	github.com/qiniu/xlog.v1 v0.0.0
	github.com/stretchr/testify v1.7.0
	github.com/tencentcloud/tencentcloud-sdk-go v1.0.80
	gopkg.in/mgo.v2 v2.0.0-20190816093944-a6b53ec6cb22
	gopkg.in/yaml.v2 v2.4.0
	qbox.us/api/message v0.0.0
	qbox.us/verifycode v0.0.0
	qiniu.com/rmb-web/admin-backend v0.0.17
	qiniu.com/rmb-web/admin-backend/mongo-api v0.0.3
	qiniu.com/rmb-web/puck/v3 v3.5.4
)

require (
	code.google.com/p/go.net v0.0.0 // indirect
	github.com/bradfitz/gomemcache v0.0.0-20190913173617-a41fca850d0b // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/facebookgo/clock v0.0.0 // indirect
	github.com/facebookgo/httpdown v0.0.0 // indirect
	github.com/facebookgo/stats v0.0.0 // indirect
	github.com/fsnotify/fsnotify v1.4.9 // indirect
	github.com/gin-contrib/pprof v1.2.1 // indirect
	github.com/gin-contrib/sse v0.1.0 // indirect
	github.com/go-playground/locales v0.14.0 // indirect
	github.com/go-playground/universal-translator v0.18.0 // indirect
	github.com/go-playground/validator/v10 v10.8.0 // indirect
	github.com/gobwas/glob v0.2.3 // indirect
	github.com/golang/freetype v0.0.0-20170609003504-e2365dfdc4a0 // indirect
	github.com/golang/groupcache v0.0.0-20200121045136-8c9f03a8e57e // indirect
	github.com/golang/protobuf v1.5.3 // indirect
	github.com/hashicorp/hcl v1.0.0 // indirect
	github.com/json-iterator/go v1.1.10 // indirect
	github.com/kavu/go_reuseport v0.0.0 // indirect
	github.com/leodido/go-urn v1.2.1 // indirect
	github.com/magiconair/properties v1.8.4 // indirect
	github.com/mattn/go-isatty v0.0.12 // indirect
	github.com/mitchellh/mapstructure v1.4.1 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.1 // indirect
	github.com/mojocn/base64Captcha v1.3.1 // indirect
	github.com/pelletier/go-toml v1.8.1 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	github.com/qiniu/api v0.0.0 // indirect
	github.com/qiniu/bytes v0.0.0 // indirect
	github.com/qiniu/errors v0.0.0 // indirect
	github.com/qiniu/http v0.0.0 // indirect
	github.com/qiniu/io v0.0.0 // indirect
	github.com/qiniu/largefile v0.0.0 // indirect
	github.com/qiniu/log.v1 v0.0.0 // indirect
	github.com/spf13/afero v1.5.1 // indirect
	github.com/spf13/cast v1.3.1 // indirect
	github.com/spf13/jwalterweatherman v1.1.0 // indirect
	github.com/spf13/pflag v1.0.5 // indirect
	github.com/spf13/viper v1.7.1 // indirect
	github.com/subosito/gotenv v1.2.0 // indirect
	github.com/teapots/inject v0.0.0 // indirect
	github.com/teapots/teapot v0.0.0 // indirect
	github.com/ugorji/go/codec v1.1.7 // indirect
	github.com/vanackere/asn1-ber v0.0.0-20140915131724-295c7b21db5d // indirect
	github.com/vanackere/ldap v0.0.0-20140915131551-e29b797d1abd // indirect
	golang.org/x/crypto v0.11.0 // indirect
	golang.org/x/image v0.0.0-20190802002840-cff245a6509b // indirect
	golang.org/x/sync v0.2.0 // indirect
	golang.org/x/sys v0.10.0 // indirect
	golang.org/x/text v0.11.0 // indirect
	google.golang.org/protobuf v1.28.0 // indirect
	gopkg.in/bsm/ratelimit.v1 v1.0.0-20170922094635-f56db5e73a5e // indirect
	gopkg.in/ini.v1 v1.62.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
	labix.org/v2/mgo v0.0.0 // indirect
	qbox.us/account-api v0.0.0 // indirect
	qbox.us/admin_api/account.v2 v0.0.0 // indirect
	qbox.us/api v0.0.0 // indirect
	qbox.us/api/account v0.0.0 // indirect
	qbox.us/api/account.v2 v0.0.0 // indirect
	qbox.us/api/one v0.0.0 // indirect
	qbox.us/api/qconf v0.0.0 // indirect
	qbox.us/biz/component/providers v0.0.0 // indirect
	qbox.us/biz/services.v2 v0.0.0 // indirect
	qbox.us/biz/utils.v2 v0.0.0 // indirect
	qbox.us/cc v0.0.0 // indirect
	qbox.us/errors v0.0.0 // indirect
	qbox.us/http v0.0.0 // indirect
	qbox.us/limit v0.0.0 // indirect
	qbox.us/oauth v0.0.0 // indirect
	qbox.us/qconf v0.0.0 // indirect
	qbox.us/ratelimit v0.0.0 // indirect
	qbox.us/servend v0.0.0 // indirect
	qiniu.com/auth v0.0.0 // indirect
)

replace qiniu.com/rmb-web/admin-backend v0.0.17 => github.com/qbox/rmb-web/admin-backend v0.0.17

replace qiniu.com/rmb-web/puck/v3 v3.5.4 => github.com/qbox/rmb-web/puck/v3 v3.5.4

replace qiniu.com/rmb-web/admin-backend/mongo-api v0.0.3 => github.com/qbox/rmb-web/admin-backend/pkg/mongo-api v0.0.3

replace github.com/facebookgo/clock v0.0.0 => ../../base/com/src/github.com/facebookgo/clock

replace github.com/facebookgo/httpdown v0.0.0 => ../../base/com/src/github.com/facebookgo/httpdown

replace github.com/facebookgo/stats v0.0.0 => ../../base/com/src/github.com/facebookgo/stats

replace github.com/kavu/go_reuseport v0.0.0 => ../../base/com/src/github.com/kavu/go_reuseport

replace github.com/qiniu/api v0.0.0 => ../../base/qiniu/src/github.com/qiniu/api

replace qbox.us/rateio v0.0.0 => ../../base/com/src/qbox.us/rateio

replace qbox.us/ratelimit v0.0.0 => ../../base/com/src/qbox.us/ratelimit

replace qbox.us/servestk v0.0.0 => ../../base/com/src/qbox.us/servestk

replace qbox.us/admin_api/account.v2 v0.0.0 => ../../base/biz/src/qbox.us/admin_api/account.v2

replace qbox.us/api/account v0.0.0 => ../../base/biz/src/qbox.us/api/account

replace qbox.us/api/account.v2 v0.0.0 => ../../base/biz/src/qbox.us/api/account.v2

replace qbox.us/api/one v0.0.0 => ../../base/biz/src/qbox.us/api/one

replace qbox.us/mockacc v0.0.0 => ../../base/biz/src/qbox.us/mockacc

replace qbox.us/api/message v0.0.0 => ../../base/biz/src/qbox.us/api/message

replace qbox.us/servend v0.0.0 => ../../base/biz/src/qbox.us/servend

replace github.com/teapots/teapot v0.0.0 => ../../base/portal/src/github.com/teapots/teapot

replace qbox.us/biz/services.v2 v0.0.0 => ../../base/portal/src/qbox.us/biz/services.v2

replace qbox.us/biz/utils.v2 v0.0.0 => ../../base/portal/src/qbox.us/biz/utils.v2

replace launchpad.net/gocheck v0.0.0 => ../../base/com/src/launchpad.net/gocheck

replace qbox.us/api v0.0.0 => ../../base/com/src/qbox.us/api

replace qbox.us/cc v0.0.0 => ../../base/com/src/qbox.us/cc

replace qbox.us/digest_auth v0.0.0 => ../../base/com/src/qbox.us/digest_auth

replace qbox.us/errors v0.0.0 => ../../base/com/src/qbox.us/errors

replace qbox.us/net v0.0.0 => ../../base/com/src/qbox.us/net

replace qbox.us/oauth v0.0.0 => ../../base/com/src/qbox.us/oauth

replace github.com/qiniu/bytes v0.0.0 => ../../base/qiniu/src/github.com/qiniu/bytes

replace github.com/qiniu/errors v0.0.0 => ../../base/qiniu/src/github.com/qiniu/errors

replace github.com/qiniu/io v0.0.0 => ../../base/qiniu/src/github.com/qiniu/io

replace github.com/qiniu/log.v1 v0.0.0 => ../../base/qiniu/src/github.com/qiniu/log.v1

replace github.com/qiniu/ts v0.0.0 => ../../base/qiniu/src/github.com/qiniu/ts

replace github.com/qiniu/xlog.v1 v0.0.0 => ../../base/qiniu/src/github.com/qiniu/xlog.v1

replace qbox.us/account-api v0.0.0 => ../../base/account-api/src/qbox.us/account-api

replace github.com/teapots/inject v0.0.0 => ../../base/portal/src/github.com/teapots/inject

replace qbox.us/qconf v0.0.0 => ../../base/biz/src/qbox.us/qconf

replace qbox.us/api/qconf v0.0.0 => ../../base/biz/src/qbox.us/api/qconf

replace qbox.us/limit v0.0.0 => ../../base/com/src/qbox.us/limit

replace qiniu.com/auth v0.0.0 => ../../base/qiniu/src/qiniu.com/auth

replace labix.org/v2/mgo v0.0.0 => ../../base/com/src/labix.org/v2/mgo

replace qbox.us/biz/component/providers v0.0.0 => ../../base/portal/src/qbox.us/biz/component/providers

replace qbox.us/verifycode v0.0.0 => ../../base/com/src/qbox.us/verifycode

replace github.com/qiniu/largefile v0.0.0 => ../../base/qiniu/src/github.com/qiniu/largefile

replace qbox.us/http v0.0.0 => ../../base/biz/src/qbox.us/http

replace github.com/qiniu/http v0.0.0 => ../../base/qiniu/src/github.com/qiniu/http

replace qbox.us/admin_api/v2/account v0.0.0 => ../../base/biz/src/qbox.us/admin_api/v2/account

replace github.com/qiniu/rpc.v1 v0.0.0 => ../../base/qiniu/src/github.com/qiniu/rpc.v1

replace code.google.com/p/go.net v0.0.0 => ../../base/com/src/code.google.com/p/go.net
