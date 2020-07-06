package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/qiniu/x/reqid"
	"github.com/qiniu/x/xlog"

	"qiniu.com/www/search/config"
	"qiniu.com/www/search/service"
)

type Controller struct {
	es    service.EsService
	crawl *service.CrawlService
}

func New() (*Controller, error) {
	es, err := service.NewEsService()
	if err != nil {
		return nil, err
	}
	return &Controller{
		es:    es,
		crawl: service.NewCrawl(es),
	}, nil
}

func (s *Controller) Search(c *gin.Context) {
	ctx := reqid.NewContextWith(c, c.Writer, c.Request)
	logger := xlog.NewWith(ctx)

	var arg service.SearchArg
	var err error
	arg.Tag = c.Query("tag")
	arg.Term = c.Query("term")
	arg.In = c.Query("in")
	arg.Alias = c.Query("site")
	from := c.DefaultQuery("from", "0")
	limit := c.DefaultQuery("limit", "10")

	if arg.Alias == "" || arg.Term == "" {
		logger.Errorf("site or term is empty")
		c.JSON(http.StatusBadRequest, nil)
		return
	}

	arg.From, err = strconv.Atoi(from)
	if err != nil {
		logger.Errorf("convert %s to int error :%v", from, err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}
	arg.Limit, err = strconv.Atoi(limit)
	if err != nil {
		logger.Errorf("convert %s to int error :%v", limit, err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	var res service.SearchRes
	res, err = s.es.Search(arg)
	if err != nil {
		logger.Errorf("Search error :%v", err)
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	if res.Total == 0 {
		c.JSON(http.StatusNotFound, nil)
		return
	}

	c.JSON(http.StatusOK, res)
}

func (s *Controller) Fetch(c *gin.Context) {
	ctx := reqid.NewContextWith(c, c.Writer, c.Request)
	logger := xlog.NewWith(ctx)

	siteName := c.Query("site")
	if siteName == "" {
		logger.Errorf("site is empty")
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid-site"})
		return
	}

	var siteArg config.SitesConfig
	for _, site := range config.Conf.Sites {
		if siteName == site.Name {
			siteArg = site
			break
		}
	}

	if siteArg.Host == "" || siteArg.Name == "" {
		logger.Errorf("invalid site")
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid-site"})
		return
	}

	go s.crawl.Crawl(logger, s.es, siteArg)
	c.JSON(http.StatusOK, nil)
	return
}

func (s *Controller) HotWords(c *gin.Context) {
	siteName := c.Query("site")
	var res []string
	for n, site := range config.Conf.Sites {
		if site.Name == siteName {
			res = site.HotWords
			break
		}
		if n == len(config.Conf.Sites)-1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid-site"})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{"items": res})
}
