package utils

import (
	"encoding/base64"
	"encoding/binary"
	"fmt"
	"math/rand"
	"strings"
	"time"
)

// Must make error panic.
func Must(err error, ctxinfo ...interface{}) {
	if err == nil {
		return
	}
	if len(ctxinfo) > 0 {
		var info []string
		for _, a := range ctxinfo {
			info = append(info, fmt.Sprintf("%v", a))
		}
		panic(fmt.Errorf("%v: %+v", strings.Join(info, " "), err))
	} else {
		panic(err)
	}
}

const (
	seed            = "abcdefghijklmnopqrstuvwxyz"
	indexNameLength = 10
)

// elasticsearch 要求 index 名字必须为小写字母
func GetRandomIndexName() string {
	b := make([]byte, indexNameLength)
	for i := range b {
		b[i] = seed[rand.Int63()%int64(len(seed))]
	}
	return string(b)
}

var pid = uint32(time.Now().UnixNano() % 4294967291)

func GenReqId() string {
	var b [12]byte
	binary.LittleEndian.PutUint32(b[:], pid)
	binary.LittleEndian.PutUint64(b[4:], uint64(time.Now().UnixNano()))
	return base64.URLEncoding.EncodeToString(b[:])
}
