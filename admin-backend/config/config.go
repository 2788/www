package config

import (
	"gopkg.in/yaml.v2"
	"os"

	"qiniu.com/rmb-web/admin-backend/pkg/app"
	mongoApi "qiniu.com/rmb-web/admin-backend/pkg/mongo-api"
)

type ServerConfig struct {
	Port                             int    `yaml:"port"`
	Mode                             string `yaml:"mode"`
	WriteTimeout                     int    `yaml:"write_timeout"`
	MongoApiPrefix                   string `yaml:"mongo_api_prefix"`
	MarketActivityResourceName       string `yaml:"market_activity_resource_name"`
	ActivityRegistrationResourceName string `yaml:"activity_registration_resource_name"`
}

type Config struct {
	app.Config             `yaml:",inline"`
	ServerConfig           `yaml:"server"`
	*mongoApi.MgoApiConfig `yaml:"mongo_api"`
}

// InitConf inits Config info
func InitConf(configPath string) (conf *Config, err error) {
	if f, err := os.Open(configPath); err != nil {
		return nil, err
	} else {
		err = yaml.NewDecoder(f).Decode(&conf)
	}
	return
}
