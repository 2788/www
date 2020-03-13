package gaea

import "github.com/qbox/www/janus/service/gaea/enums"

type ReqProductOrderNew struct {
	ProductId    int64    `json:"product_id"`
	Duration     uint     `json:"duration"`
	TimeDuration uint64   `json:"time_duration"`
	Quantity     uint     `json:"quantity"`
	Property     *string  `json:"property"`
	Fee          *float64 `json:"fee"`
}

type ReqOrderNew struct {
	Orders  []ReqProductOrderNew `json:"orders"`
	BuyerId uint32               `json:"uid"`
	Memo    string               `json:"memo"`
}

type RespOrderNew struct {
	OrderHash string `json:"order_hash"`
}

type ReqPackageBuy struct {
	PackageID  int64            `json:"package_id"`
	Quantity   uint             `json:"quantity"`
	BuyerID    uint32           `json:"buyer_id"`
	Memo       string           `json:"memo"`
	EffectType enums.EffectType `json:"effect_type"`
}

type RespPackageBuy struct {
	OrderHashes []string `json:"order_hashes"`
}
