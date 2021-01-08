package config

import (
	"os"

	"gopkg.in/yaml.v2"

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

// TbpConfig 对接腾讯智能对话平台（tbp）的配置
type TbpConfig struct {
	// SecretId, SecretKey 鉴权用密钥，见 https://console.cloud.tencent.com/cam/capi
	SecretId  string `yaml:"secret_id"`
	SecretKey string `yaml:"secret_key"`
	Host      string `yaml:"host"`    // 腾讯云 API host
	BotId     string `yaml:"bot_id"`  // 机器人标识
	BotEnv    string `yaml:"bot_env"` // 机器人版本，取值"dev"或"release"，{调试版本：dev；线上版本：release}。
}

type Config struct {
	app.Config             `yaml:",inline"`
	ServerConfig           `yaml:"server"`
	*mongoApi.MgoApiConfig `yaml:"mongo_api"`
	Tbp                    TbpConfig `yaml:"tbp"`
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
