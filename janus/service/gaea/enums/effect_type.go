package enums

type EffectType int

const (
	// EffectTypeUndefined undefined
	EffectTypeUndefined EffectType = 0
	// EffectTypeAtOnce in-service at once
	EffectTypeAtOnce = 1
	// EffectTypeNextMonth1st in-service at next month 1st day
	EffectTypeNextMonth1st = 2
	// EffectTypeCurrMonth1st in-service at current month 1st day
	EffectTypeCurrMonth1st = 3
)
