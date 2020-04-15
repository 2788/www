package config

import (
	"io/ioutil"

	yaml "gopkg.in/yaml.v2"
)

// Config config for app
type Config struct {
	Server   ServerConfig   `yaml:"server"`
	Redis    RedisConfig    `yaml:"redis"`
	Acc      AccConfig      `yaml:"acc"`
	SSO      SSOConfig      `yaml:"sso"`
	Session  SessionConfig  `yaml:"session"`
	Services ServicesConfig `yaml:"services"`
	Host     Host           `yaml:"host"`
}

// ServerConfig config for server
type ServerConfig struct {
	Port string  `yaml:"port"`
	Mode RunMode `yaml:"mode"`
}

// RedisConfig config for redis service
type RedisConfig struct {
	Addrs      []string `yaml:"addrs"`
	MasterName string   `yaml:"master_name"`
	Failover   bool     `yaml:"failover"`
	Password   string   `yaml:"password"`
	DB         int      `yaml:"db"`
	Size       int      `yaml:"size"`
	Networt    string   `yaml:"network"`
	KeyPairs   string   `yaml:"key_pairs"`
}

type SessionConfig struct {
	MaxAge int `yaml:"max_age"`
}

// AccConfig config for acc auth
type AccConfig struct {
	Host     string `yaml:"host"`
	Username string `yaml:"username"`
	Password string `yaml:"password"`
}

// SSOConfig sso configuration
type SSOConfig struct {
	Host         string `yaml:"host"`
	ClientId     string `yaml:"client_id"`
	CookieSecret string `yaml:"cookie_secret"`
}

// ServicesConfig config for other services
type ServicesConfig struct {
	LegoHost string `yaml:"lego_host"`
}

// Host config for host
type Host struct {
	MarketingFront string `yaml:"marketing_front"`
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
