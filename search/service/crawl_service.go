package service

import (
	"bytes"
	"crypto/sha1"
	"fmt"
	"net/url"
	"regexp"
	"strings"
	"sync"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/go-redis/redis"
	"github.com/gocolly/colly/v2"
	"github.com/qiniu/x/xlog.v7"

	"qiniu.com/www/search/config"
	"qiniu.com/www/search/utils"
)

const KeyPrefix = "www:search:"

type CrawlService struct {
	redis *redis.Client
	sites []config.SitesConfig
}

func NewCrawl(es EsService) *CrawlService {
	client := redis.NewClient(&redis.Options{
		Addr: config.Conf.RedisHost,
	})
	crawl := &CrawlService{
		sites: config.Conf.Sites,
		redis: client,
	}
	go crawl.FetchTimer(es)
	return crawl
}

func (c *CrawlService) TryLock(key string, value int64) error {
	// 此处锁的过期时间是经验值
	ok, err := c.redis.SetNX(key, value, time.Second*30).Result()
	if err != nil {
		return err
	}
	if !ok {
		return fmt.Errorf("redis SetNX not ok")
	}
	return nil
}

var unlockScript = `
if redis.call("get",KEYS[1]) == ARGV[1]
then
    return redis.call("del",KEYS[1])
else
    return 0
end
`

func (c *CrawlService) Unlock(key string, value int64) error {
	return c.redis.Eval(unlockScript, []string{key}, value).Err()
}

func (c *CrawlService) FetchTimer(es EsService) {
	for _, site := range c.sites {
		go func(s config.SitesConfig) {
			ticker := time.NewTicker(time.Duration(s.Interval) * time.Minute)
			for {
				logger := xlog.New(utils.GenReqId())
				c.Crawl(logger, es, s)
				<-ticker.C
			}
		}(site)
	}
}

func (c *CrawlService) Crawl(logger *xlog.Logger, es EsService, site config.SitesConfig) {
	// 对同一个域名抓取加锁，为了防止多台机器间的抓取冲突
	key := KeyPrefix + site.Name
	value := time.Now().UnixNano()
	err := c.TryLock(key, value)
	if err != nil {
		logger.Errorf("TryLock %s error :%v", key, err)
		return
	}

	defer func() {
		// 释放锁
		err = c.Unlock(key, value)
		if err != nil {
			logger.Errorf("Unlock %s error :%v", key, err)
			return
		}
	}()

	domain, err := getDomainByHost(site.Host)
	if err != nil {
		logger.Errorf("getDomainByHost error :%v", err)
		return
	}

	var documents []Document
	// 加锁为了保证并行时对 documents 的更改的正确性
	var lock sync.Mutex
	col := colly.NewCollector(
		colly.Async(true),
		colly.AllowedDomains(domain),
		colly.MaxDepth(config.Conf.Crawl.MaxDepth),
	)
	col.SetRequestTimeout(time.Duration(config.Conf.Crawl.RequestTimeOut) * time.Second)

	col.Limit(&colly.LimitRule{
		Parallelism: config.Conf.Crawl.RoutineNum,
	})

	col.OnError(func(r *colly.Response, err error) {
		logger.Errorf("visit url (%s) error :%v", r.Request.URL.String(), err)
	})

	col.OnResponse(func(r *colly.Response) {
		cachePages(logger, &documents, string(r.Body), r.Request.URL, &lock, site)
	})

	col.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		e.Request.Visit(link)
	})

	col.Visit(site.Host)

	col.Wait()
	es.Store(logger, site.Name, documents)
	return
}

// 该方法将抓取到的网页内容存入缓存数组 StoredArgs 中
func cachePages(logger *xlog.Logger, documents *[]Document, data string, url *url.URL, lock *sync.Mutex, site config.SitesConfig) {
	// 查看当前 url 是否位于黑名单，如果是则不存储
	for _, item := range site.BlackList {
		if strings.HasPrefix(url.Path, item) {
			return
		}
	}

	// 存储网页内容
	var document Document
	doc, err := goquery.NewDocumentFromReader(bytes.NewBufferString(data))
	if err != nil {
		logger.Errorf("NewDocumentFromReader error :%v", err)
		return
	}

	// 去掉 script 标签
	doc.Find("script").Each(func(i int, s *goquery.Selection) {
		s.Remove()
	})

	document.Title = doc.Find("title").First().Text()
	document.Url = url.String()
	document.Tag = "others"
	for t, subPath := range site.Tags {
		if strings.HasPrefix(url.Path, subPath) {
			document.Tag = t
			break
		}
	}

	// 处理 content
	content := dealContent(doc.Text())

	doc.Find("head meta").Each(func(i int, selection *goquery.Selection) {
		if name, exist := selection.Attr("name"); exist {
			if c, exist := selection.Attr("content"); exist {
				switch name {
				case "keywords":
					document.Keywords = c
				case "description":
					document.Description = c
				}
			}
		}
	})

	document.Content = content

	// 根据返回内容和请求 url 生成唯一 id
	id, err := genIdWithContentAndUrl(content, url)
	if err != nil {
		logger.Printf("generateId with content(%s) and url(%s) error : %v", content, document.Url, err)
		return
	}

	document.Id = id
	lock.Lock()
	*documents = append(*documents, document)
	lock.Unlock()
	return
}

// 通过 content 与 url 生成唯一 id
func genIdWithContentAndUrl(content string, url *url.URL) (res string, err error) {
	// url.Path 去掉多余的后缀 '/'
	url.Path = trimSuffix(url.Path, "/")
	fullPath := url.Host + url.Path
	data := fullPath + content

	h := sha1.New()
	_, err = h.Write([]byte(data))
	if err != nil {
		err = fmt.Errorf("generate id error :%v", err)
		return
	}
	res = string(h.Sum(nil))
	return
}

func trimSuffix(s, suffix string) string {
	if strings.HasSuffix(s, suffix) {
		s = s[:len(s)-len(suffix)]
	}
	return s
}

func getDomainByHost(host string) (string, error) {
	u, err := url.Parse(host)
	if err != nil {
		return "", fmt.Errorf("%s parse error :%v", host, err)
	}
	return u.Host, nil
}

var contentRegexp = regexp.MustCompile("[\\n\\s]+")

func dealContent(s string) string {
	s = strings.TrimSpace(s)
	return contentRegexp.ReplaceAllString(s, " ")
}
