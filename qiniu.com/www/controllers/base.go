package controllers

import (
	"qiniu.com/www/service/cache"
)

// Base Controller base
type Base struct {
	Cache cache.Cache
}
