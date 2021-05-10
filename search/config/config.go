package config

import (
	"gopkg.in/yaml.v2"
	"os"
)

type Mode string

const (
	DevMode  Mode = "dev"
	TestMode Mode = "test"
	ProdMode Mode = "prod"
)

type ServerConfig struct {
	Port int  `yaml:"port"`
	Mode Mode `yaml:"mode"`
}

type CrawlConfig struct {
	MaxDepth       int `yaml:"max_depth"`       // 爬虫的最大深度
	RoutineNum     int `yaml:"routine_num"`     // 爬虫的并行请求的数量
	RequestTimeOut int `yaml:"request_timeout"` // 请求的超时时间, 单位是秒
}

type WeightConfig struct {
	Title       float64 `yaml:"title"`
	Content     float64 `yaml:"content"`
	Keywords    float64 `yaml:"keywords"`
	Description float64 `yaml:"description"`
}

var WeightDefault = WeightConfig{
	Title:       6,
	Content:     2,
	Keywords:    1,
	Description: 1,
}

type SitesConfig struct {
	Name      string            `yaml:"name"`
	Host      string            `yaml:"host"`
	HotWords  []string          `yaml:"hot_words"`
	Interval  int               `yaml:"interval"` // 时间间隔多久自动爬取该域名下的资源，单位为分钟
	Tags      map[string]string `yaml:"tags"`
	BlackList []string          `yaml:"black_list"`
	Weight    WeightConfig      `yaml:"weight"` // 用于配置搜索时各字段的权重值
}

type Config struct {
	Server     ServerConfig  `yaml:"server"`
	Crawl      CrawlConfig   `yaml:"crawl"`
	EsHosts    string        `yaml:"es_hosts"`
	RedisHosts string        `yaml:"redis_hosts"`
	Sites      []SitesConfig `yaml:"sites"`
}

var Conf *Config

func Init(configPath string) (err error) {
	if f, err := os.Open(configPath); err != nil {
		return err
	} else {
		err = yaml.NewDecoder(f).Decode(&Conf)
	}
	return
}
