package counter

import "time"

type Counter interface {
	Get() int
	Increase(add int) error
	Reset()
	IsLimitReached() bool
}

type Service interface {
	Create(key string, limit int, penaltyDuration time.Duration) Counter
}
