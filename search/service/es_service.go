package service

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/olivere/elastic/v7"
	"github.com/qiniu/x/xlog.v7"

	"qiniu.com/www/search/config"
	"qiniu.com/www/search/utils"
)

type esService struct {
	client *elastic.Client
}

type EsService interface {
	store(string, []Document) error
	Store(*xlog.Logger, string, []Document)
	Search(SearchArg) (SearchRes, error)
}

func NewEsService() (EsService, error) {
	urls := strings.Split(config.Conf.EsHosts, ",")
	esClient, err := elastic.NewClient(elastic.SetURL(urls...))
	if err != nil {
		return nil, err
	}
	es := &esService{client: esClient}
	return es, nil
}

const EsIndexConfig = `
{
	"settings": {
		"number_of_shards": 1,
		"number_of_replicas": 0
	},
	"mappings": {
		"_doc": {
			"properties": {
				"id": {
					"type": "text"
				},
				"title": {
					"type": "text",
					"analyzer": "ik_max_word",
					"search_analyzer": "ik_smart"
				},
				"url": {
					"type": "text"
				},
				"content": {
					"type": "text",
					"analyzer": "ik_max_word",
					"search_analyzer": "ik_smart"
				},
				"keywords": {
					"type": "text",
					"analyzer": "ik_max_word",
					"search_analyzer": "ik_smart"
				},
				"description": {
					"type": "text",
					"analyzer": "ik_max_word",
					"search_analyzer": "ik_smart"
				},
				"tag": {
					"type": "text"
				}
			}
		}
	}
}`

type Document struct {
	Title       string `json:"title"`
	Url         string `json:"url"`
	Content     string `json:"content"`
	Tag         string `json:"tag"`
	Id          string `json:"id"`
	Keywords    string `json:"keywords"`
	Description string `json:"description"`
}

// 批量存储
func (es *esService) store(index string, docs []Document) (err error) {
	ctx := context.Background()
	bulkService := es.client.Bulk()
	for i, arg := range docs {
		req := elastic.NewBulkIndexRequest().Index(index).Type("_doc").Id(docs[i].Id).Doc(arg)
		bulkService = bulkService.Add(req)
	}
	res, err := bulkService.Do(ctx)
	if err != nil {
		return err
	}
	// bulk 请求中的一个或多个操作没有成功完成
	if len(res.Failed()) > 0 {
		err = fmt.Errorf("bulk error :%v, nums: %d", res.Errors, len(res.Failed()))
	}
	return err
}

// 当新的抓取完成后，需要将 aliasName 的内容设置为 documents
func (es *esService) Store(logger *xlog.Logger, aliasName string, documents []Document) {
	// TODO: 目前实现是每抓取一次就将 index 删除重新创建一个 index。以后可以优化为对比新旧抓取内容的不同，对不同处进行更新
	ctx := context.Background()

	var oldIndexName string
	res, err := es.client.Aliases().Index("_all").Do(ctx)
	if err != nil {
		logger.Errorf("es get all index error :%v", err)
		return
	}
	// 获取当前 alias 的 indices
	aliasIndices := res.IndicesByAlias(aliasName)
	if len(aliasIndices) == 1 {
		oldIndexName = aliasIndices[0]
	}

	// 随机生成一个与 oldIndexName 不一样的 indexName
	var indexName string
	for {
		indexName = utils.GetRandomIndexName()
		if indexName != oldIndexName {
			break
		}
	}

	// 用 indexName 创建新的索引
	_, err = es.client.CreateIndex(indexName).BodyString(EsIndexConfig).Do(ctx)
	if err != nil {
		logger.Errorf("create index %s error :%v", indexName, err)
		return
	}

	// 插入数据
	err = es.store(indexName, documents)
	if err != nil {
		logger.Errorf("store err :%v", err)
		return
	}

	var aliasRes *elastic.AliasResult
	// 将 indexName 链接到 aliasName 上
	if oldIndexName != "" {
		aliasRes, err = es.client.Alias().Add(indexName, aliasName).Action(elastic.NewAliasRemoveIndexAction(oldIndexName)).Do(ctx)
	} else {
		aliasRes, err = es.client.Alias().Add(indexName, aliasName).Do(ctx)
	}

	if err != nil {
		logger.Errorf("alias add index %s error :%v", indexName, err)
		return
	}
	if aliasRes != nil && !aliasRes.Acknowledged {
		logger.Errorf("expected aliasAddRes.Acknowledged true, but get :%v", aliasRes.Acknowledged)
		return
	}
	return
}

type SearchArg struct {
	Alias string // 此处值为 index 的别名
	Tag   string
	Term  string
	From  int
	Limit int
	In    string // in 的值指定在 title 或者 content 里面搜索，不传则默认在所有里面搜索结果
}

type SearchRes struct {
	Total int64  `json:"total"`
	Items []Item `json:"items"`
}

type Item struct {
	Title       string   `json:"title"`
	Url         string   `json:"url"`
	Tag         string   `json:"tag"`
	Matched     []string `json:"matched"`
	Keywords    string   `json:"keywords"`
	Description string   `json:"description"`
}

func (es *esService) Search(arg SearchArg) (res SearchRes, err error) {
	ctx := context.Background()

	var searchRes *elastic.SearchResult
	var query elastic.Query

	// 获取配置中各查询值的权重
	weight := getWeight(arg.Alias)

	tagQuery := elastic.NewMatchQuery("tag", arg.Tag)
	termQueryWithIn := elastic.NewMatchQuery(arg.In, arg.Term)
	// 设置查询时 title & content 的权重，默认 boost 值为 1
	termQueryInContent := elastic.NewMatchQuery("content", arg.Term).Boost(weight.Content)
	termQueryInTitle := elastic.NewMatchQuery("title", arg.Term).Boost(weight.Title)
	termQueryInKeywords := elastic.NewMatchQuery("keywords", arg.Term).Boost(weight.Keywords)
	termQueryInDescription := elastic.NewMatchQuery("description", arg.Term).Boost(weight.Description)

	if arg.In != "" && arg.Tag != "" {
		// 在 tag 满足查询条件的情况下查询在 arg.In 里面满足条件的结果
		query = elastic.NewBoolQuery().Must(tagQuery, termQueryWithIn)
	} else if arg.In != "" && arg.Tag == "" {
		// 查询在 arg.In 里面满足条件的结果
		query = termQueryWithIn
	} else if arg.In == "" && arg.Tag != "" {
		// 在 tag 满足查询条件的情况下查询 title 或 content 或 keywords 或 description 中满足条件的结果
		query = elastic.NewBoolQuery().Must(tagQuery).Should(termQueryInContent, termQueryInTitle, termQueryInKeywords, termQueryInDescription).MinimumNumberShouldMatch(1)
	} else if arg.In == "" && arg.Tag == "" {
		// 查询 title 或 content 或 keywords 或 description 中满足条件的结果
		query = elastic.NewBoolQuery().Should(termQueryInContent, termQueryInTitle, termQueryInKeywords, termQueryInDescription).MinimumNumberShouldMatch(1)
	}

	// 设置搜索结果高亮
	hl := elastic.NewHighlight()
	hl = hl.Fields(elastic.NewHighlighterField("content"), elastic.NewHighlighterField("title"), elastic.NewHighlighterField("description"))
	hl = hl.PreTags("<em>").PostTags("</em>")

	searchRes, err = es.client.Search().
		Index(arg.Alias).
		Highlight(hl).
		Query(query).
		From(arg.From).Size(arg.Limit).
		Pretty(true).
		Do(ctx)
	if err != nil {
		err = fmt.Errorf("esclient search error :%v", err)
		return
	}

	for _, hit := range searchRes.Hits.Hits {
		var item Item
		if err = json.Unmarshal(hit.Source, &item); err != nil {
			err = fmt.Errorf("json Unmarshal error :%v", err)
			return
		}
		if hit.Highlight != nil && len(hit.Highlight) != 0 {
			item.Matched = hit.Highlight["content"]
			if value, ok := hit.Highlight["title"]; ok {
				item.Title = value[0]
			}
			if value, ok := hit.Highlight["description"]; ok {
				item.Description = value[0]
			}
		}
		res.Items = append(res.Items, item)
	}
	res.Total = searchRes.TotalHits()
	return
}

// 该方法用来获取各查询字段的权重
func getWeight(siteName string) (weight config.WeightConfig) {
	// 获取配置中各查询值的权重
	for _, site := range config.Conf.Sites {
		if siteName == site.Name {
			weight = site.Weight
			break
		}
	}

	// 如果没有配置，则使用默认值
	if weight.Title == 0 {
		weight.Title = config.WeightDefault.Title
	}
	if weight.Content == 0 {
		weight.Content = config.WeightDefault.Content
	}
	if weight.Description == 0 {
		weight.Description = config.WeightDefault.Description
	}
	if weight.Keywords == 0 {
		weight.Keywords = config.WeightDefault.Keywords
	}
	return
}
