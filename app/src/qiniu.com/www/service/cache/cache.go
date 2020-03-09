package cache

import "errors"

// Cache interface for cache
type Cache interface {
    Get(key string, value interface{}) error
    // ex expired time, unit: seconds, 0 means unlimited expired time
    Set(key string, value interface{}, ex int) error
    // set key if not exists
    SetNX(key string, value interface{}, ex int) (bool, error)
    Del(key string) error
}

// ErrNotFound defines not found error
var ErrNotFound = errors.New("Not found")