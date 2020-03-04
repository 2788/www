package config

import (
	"io/ioutil"

	yaml "gopkg.in/yaml.v2"
)

// Config config for app
type Config struct {
	Server   ServerConfig   `yaml:"server"`
	Auth     APIAuth        `yaml:"auth"`
	Redis    RedisConfig    `yaml:"redis"`
	Acc      AccConfig      `yaml:"acc"`
	SSO      SSOConfig      `yaml:"sso"`
	Services ServicesConfig `yaml:"services"`
}

// ServerConfig config for server
type ServerConfig struct {
	Port string  `yaml:"port"`
	Mode RunMode `yaml:"mode"`
}

// APIAuth config for api auth
type APIAuth struct {
	MockToken      bool   `yaml:"mock_token"`
	SecretKey      string `yaml:"secret_key"`
	TokenExpiresIn int    `yaml:"token_expires_in"`
}

// RedisConfig config for redis service
type RedisConfig struct {
	Addrs      []string `yaml:"addrs"`
	MasterName string   `yaml:"master_name"`
	Failover   bool     `yaml:"failover"`
	Password   string   `yaml:"password"`
	DB         int      `yaml:"db"`
}

// AccConfig config for acc auth
type AccConfig struct {
	Host         string `yaml:"host"`
	Username     string `yaml:"username"`
	Password     string `yaml:"password"`
	ClientID     string `yaml:"client_id"`
	ClientSecret string `yaml:"client_secret"`
}

// SSOConfig
type SSOConfig struct {
	Host         string `yaml:"host"`
	ClientId     string `yaml:"client_id"`
	ClientSecret string `yaml:"client_secret"`
	CookieSecret string `yaml:"cookie_secret"`
}

// ServicesConfig config for other services
type ServicesConfig struct {
	GaeaHost string `yaml:"gaea_host"`
}

// ParseConfig parses config file
func ParseConfig(file string) (*Config, error) {
	confData, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, err
	}

	conf := &Config{}
	err = yaml.Unmarshal(confData, conf)
	if err != nil {
		return nil, err
	}

	if conf.Server.Mode == "" {
		conf.Server.Mode = ProdMode
	}

	return conf, nil
}

// Valid checks redis config is valid or not
func (c *RedisConfig) Valid() bool {
	if len(c.Addrs) == 0 {
		return false
	}

	if c.Failover && c.MasterName == "" {
		return false
	}

	return true
}
