package controllers

import (
	"net/http"
)

// Base Controller base
type Base struct {
	// Cache cache.Cache
	Req *http.Request
	Rw  http.ResponseWriter
}
