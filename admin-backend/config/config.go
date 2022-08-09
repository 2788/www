package config

import (
	"os"

	"gopkg.in/yaml.v2"

	mongoApi "qiniu.com/rmb-web/admin-backend/mongo-api"
	"qiniu.com/rmb-web/admin-backend/pkg/app"
)

type ServerConfig struct {
	Port                             int               `yaml:"port"`
	Mode                             string            `yaml:"mode"`
	WriteTimeout                     int               `yaml:"write_timeout"`
	MongoApiPrefix                   string            `yaml:"mongo_api_prefix"`
	MarketActivityResourceName       string            `yaml:"market_activity_resource_name"`
	ActivityRegistrationResourceName string            `yaml:"activity_registration_resource_name"`
	SMSTemplates                     SMSTemplateConfig `yaml:"sms_templates"`
	SMSBatchLimit                    int               `yaml:"sms_batch_limit"`
	MorseHost                        string            `yaml:"morse_host"`
	MorseClientId                    string            `yaml:"morse_client_id"`
	SendMessageTaskInterval          int               `yaml:"send_message_task_interval"`
	RedisHosts                       string            `yaml:"redis_hosts"`
	LilliputHost                     string            `yaml:"lilliput_host"` // 短链服务地址
}

type Refresher struct {
	AccessKey                string   `yaml:"access_key"`                  // 存储官网内容账号的 ak
	SecretKey                string   `yaml:"secret_key"`                  // 存储官网内容账号的 sk
	Bucket                   string   `yaml:"bucket"`                      // 官网内容存储空间
	Url                      string   `yaml:"url"`                         // 官网 url
	PrefixPathBlacklist      []string `yaml:"prefix_path_blacklist"`       // 不可以传入在黑名单中的 `path` 作为前缀刷新参数
	KodoPrefetchMaxGoroutine int      `yaml:"kodo_prefetch_max_goroutine"` // prefetch 操作最大的并发数量
}

type SMSTemplateConfig struct {
	ActivityReminder          string `yaml:"activity_reminder"`            // 活动提醒模版
	ActivityRegSucceed        string `yaml:"activity_reg_succeed"`         // 活动报名成功模版
	ActivityCheckinLinkPrefix string `yaml:"activity_checkin_link_prefix"` // 活动签到链接前缀
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
	Refresher              Refresher `yaml:"refresher"`
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
