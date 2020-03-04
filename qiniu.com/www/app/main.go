package main

import (
	"flag"
	"fmt"

	"github.com/sirupsen/logrus"
	"qiniu.com/www/env"
	"qiniu.com/www/env/config"
)

func main() {
	var (
		confPath    string
		autoMigrate bool
	)
	flag.StringVar(&confPath, "conf", "config.yml", "config file path")
	flag.BoolVar(&autoMigrate, "automigrate", false, "enable auto migration of db schema")
	flag.Parse()

	conf, err := config.ParseConfig(confPath)
	if err != nil {
		logrus.WithField("err", err).Fatal("failed to load config")
		return
	}

	// logger.InitLogger(nil, true, false)

	app := env.InitAppEngine(logrus.StandardLogger(), conf)

	env.InitRouters(app)

	fmt.Println("run on:", conf.Server.Port)
	err = app.Run(conf.Server.Port)
	if err != nil {
		fmt.Println(err)
		return
	}
}
