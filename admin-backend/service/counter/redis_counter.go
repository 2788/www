package counter

import (
	"errors"
	"time"

	"github.com/go-redis/redis/v7"
)

var LimitReachedError = errors.New("counter limit reached")

type redisCounter struct {
	client     redis.UniversalClient
	key        string
	limit      int
	expiration time.Duration
}

func newRedisCounter(client redis.UniversalClient, key string, limit int, expiration time.Duration) Counter {
	return &redisCounter{
		client:     client,
		key:        key,
		limit:      limit,
		expiration: expiration,
	}
}

func (c *redisCounter) Increase(add int) error {

	n, _ := c.client.Get(c.key).Int64()
	if int(n)+add > c.limit {
		return LimitReachedError
	}

	// Increase
	// We must use a pipelined transcation here to set expiration or race condition will occur.
	// See http://redis.io/commands/incr#pattern-rate-limiter-1
	pipe := c.client.TxPipeline()
	pipe.IncrBy(c.key, int64(add))
	pipe.Expire(c.key, c.expiration)
	_, err := pipe.Exec()

	return err
}

func (c *redisCounter) IsLimitReached() bool {
	n, _ := c.client.Get(c.key).Int64()
	return int(n) >= c.limit
}

func (c *redisCounter) Get() int {
	n, _ := c.client.Get(c.key).Int64()
	return int(n)
}

func (c *redisCounter) Reset() {
	c.client.Del(c.key)
}

type RedisCounterService struct {
	client redis.UniversalClient
}

func NewRedisCounterService(client redis.UniversalClient) *RedisCounterService {
	return &RedisCounterService{client: client}
}

func (s *RedisCounterService) Create(key string, limit int, penaltyDuration time.Duration) Counter {
	return newRedisCounter(s.client, key, limit, penaltyDuration)
}
