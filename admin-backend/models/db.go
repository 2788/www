package models

import (
	"gopkg.in/mgo.v2"
)

func InitDB(host string) (sess *mgo.Session, err error) {
	sess, err = mgo.Dial(host)
	if err != nil {
		return
	}
	// 强一致性
	sess.SetMode(mgo.Strong, true)
	// 设置连接池的数量上限（默认比较大）
	sess.SetPoolLimit(50)
	return
}
