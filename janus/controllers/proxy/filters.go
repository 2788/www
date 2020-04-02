package proxy

import (
	"github.com/gin-gonic/gin"
	"github.com/qbox/www/janus/env/config"
)

type (
	ProxyFilter func(proxy *Proxy, ctx *gin.Context) (bool, error)
)

var Filters = map[config.FilterName]ProxyFilter{
	config.LoginRequired: LoginRequiredFilter,
}

func (s *Proxy) DoFilters(ctx *gin.Context, filters []ProxyFilter) (bool, error) {
	for _, filter := range filters {
		ok, err := filter(s, ctx)
		if err != nil {
			return false, err
		}
		if !ok {
			return false, nil
		}
	}

	return true, nil
}

func (s *Proxy) GetFilters(filterNames []config.FilterName) []ProxyFilter {
	var filters = make([]ProxyFilter, 0)
	for _, name := range filterNames {
		filters = append(filters, Filters[name])
	}

	return filters
}
