package config

import (
	"gopkg.in/yaml.v2"
	"os"

	mongoApi "qiniu.com/rmb-web/admin-backend/mongo-api"
	"qiniu.com/rmb-web/admin-backend/pkg/app"
)

type ServerConfig struct {
	Port                             int    `yaml:"port"`
	Mode                             string `yaml:"mode"`
	WriteTimeout                     int    `yaml:"write_timeout"`
	MongoApiPrefix                   string `yaml:"mongo_api_prefix"`
	MarketActivityResourceName       string `yaml:"market_activity_resource_name"`
	ActivityRegistrationResourceName string `yaml:"activity_registration_resource_name"`
	SMSTemplate                      string `yaml:"sms_template"`
	SMSBatchLimit                    int    `yaml:"sms_batch_limit"`
	MorseHost                        string `yaml:"morse_host"`
	MorseClientId                    string `yaml:"morse_client_id"`
	SendMessageTaskInterval          int    `yaml:"send_message_task_interval"`
	RedisHost                        string `yaml:"redis_host"`
	RedisDB                          int    `yaml:"redis_db"`
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
