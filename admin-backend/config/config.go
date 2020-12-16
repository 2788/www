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
	MarketActivityCollection         string `yaml:"market_activity_collection"`
	ActivityRegistrationCollection   string `yaml:"activity_registration_collection"`
	SMSTemplate                      string `yaml:"sms_template"`
	SMSBatchLimit                    int    `yaml:"sms_batch_limit"`
	MorseHost                        string `yaml:"morse_host"`
	MorseClientId                    string `yaml:"morse_client_id"`
	SendMessageTaskInterval          int    `yaml:"send_message_task_interval"`
	RedisHost                        string `yaml:"redis_host"`
	WWWMongoHost                     string `yaml:"www_mongo_host"`
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
