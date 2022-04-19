package main

import (
	"fmt"
	"strings"

	mongoApi "qiniu.com/rmb-web/admin-backend/mongo-api"
	"qiniu.com/rmb-web/admin-backend/pkg/app"

	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/routes"
	"qiniu.com/www/admin-backend/service"
)

func main() {
	conf, err := config.InitConf("config/config.yml")
	Must(err)

	r, err := app.InitEngine(conf.Mode, &conf.Config)
	Must(err)

	// 记录审计
	if conf.AuditLog.LogFile != "" {
		auditLogger, err := app.GetAuditLogger(&conf.Config, "WWW-ADMIN-BACKEND")
		Must(err)
		defer auditLogger.Close()
		r.Use(auditLogger.Handler)
	}

	err = r.InitDBAndData("config/init_data.json")
	Must(err)

	err = r.InitRouters()
	Must(err)

	if conf.MgoApiConfig != nil {
		mongoApis := r.Group(conf.MongoApiPrefix, app.ParseAuthMiddleware(&conf.Config), app.AdminCheck())
		err = mongoApi.Init(mongoApis, conf.MgoApiConfig)
		Must(err)
	}

	err = routes.InitCustomRoutes(r.Engine, conf)
	Must(err)

	// 定时发送短信通知
	cronJobService := service.NewCronJobService(conf)
	go cronJobService.RunActivityReminder()

	app.RunHTTPServer(conf.Port, conf.WriteTimeout, r)
}

// Must make error panic.
func Must(err error, ctxinfo ...interface{}) {
	if err == nil {
		return
	}
	if len(ctxinfo) > 0 {
		var info []string
		for _, a := range ctxinfo {
			info = append(info, fmt.Sprintf("%v", a))
		}
		panic(fmt.Errorf("%v: %+v", strings.Join(info, " "), err))
	} else {
		panic(err)
	}
}
