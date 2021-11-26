package verification

import (
	"time"

	"github.com/go-redis/redis/v7"
)

type Store interface {
	Get(key string) string
	Set(key, value string, expiry int)
	Delete(key string)
}

type RedisStore struct {
	client redis.UniversalClient
}

func NewRedisStore(client redis.UniversalClient) *RedisStore {
	return &RedisStore{
		client: client,
	}
}

func (s *RedisStore) Get(key string) string {
	return s.client.Get(key).Val()
}

func (s *RedisStore) Set(key, value string, expiry int) {
	s.client.Set(key, value, time.Second*time.Duration(expiry))
}

func (s *RedisStore) Delete(key string) {
	s.client.Del(key)
}
