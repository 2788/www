package main

import (
	"flag"

	"github.com/qbox/www/janus/env"
	"github.com/qbox/www/janus/env/config"
	"github.com/sirupsen/logrus"
)

func main() {
	var (
		confPath    string
		proxyPath   string
		autoMigrate bool
	)
	flag.StringVar(&confPath, "conf", "config.yml", "config file path")
	flag.StringVar(&proxyPath, "proxy", "proxy.json", "proxo config file path")
	flag.BoolVar(&autoMigrate, "automigrate", false, "enable auto migration of db schema")
	flag.Parse()

	conf, err := config.ParseConfig(confPath)
	if err != nil {
		logrus.WithField("err", err).Fatal("failed to load config")
		return
	}
	proxyConf, err := config.ParseProxyEntry(proxyPath)
	if err != nil {
		logrus.WithField("err", err).Fatal("failed to load proxy config")
		return
	}

	app := env.InitAppEngine(logrus.StandardLogger(), conf, proxyConf)

	env.InitRouters(app)

	err = app.Run(conf.Server.Port)
	if err != nil {
		logrus.Errorf("www-develop service run with err, err:%s.", err)
		return
	}
}
