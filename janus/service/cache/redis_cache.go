package cache

import (
    "encoding/json"
    "fmt"
    "time"

    "github.com/go-redis/redis"
)

type redisCache struct {
    client    *redis.Client
    keyPrefix string
}

// NewRedisCache initializes a redis cache
func NewRedisCache(client *redis.Client, keyPrefix string) Cache {
    return &redisCache{
        client:    client,
        keyPrefix: keyPrefix,
    }

}

func (rc *redisCache) key(key string) string {
    if rc.keyPrefix != "" {
        return fmt.Sprintf("%s:%s", rc.keyPrefix, key)
    }
    return key
}

func (rc *redisCache) Get(key string, value interface{}) error {
    data, err := rc.client.Get(rc.key(key)).Bytes()
    if err != nil {
        if err == redis.Nil {
            return ErrNotFound
        }
        return err
    }

    return json.Unmarshal(data, value)
}

func (rc *redisCache) Set(key string, value interface{}, ex int) error {
    data, err := json.Marshal(value)
    if err != nil {
        return err
    }

    err = rc.client.Set(rc.key(key), data, time.Duration(ex)*time.Second).Err()
    return err
}

func (rc *redisCache) SetNX(key string, value interface{}, ex int) (bool, error) {
    data, err := json.Marshal(value)
    if err != nil {
        return false, err
    }

    return rc.client.SetNX(rc.key(key), data, time.Duration(ex)*time.Second).Result()
}

func (rc *redisCache) Del(key string) error {
    return rc.client.Del(rc.key(key)).Err()
}