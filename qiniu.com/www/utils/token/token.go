package token

import (
	"bytes"
	"encoding/base64"
	"encoding/gob"
	"errors"
	"time"

	"qiniu.com/www/utils/crypto"
)

// Payload payload data in token
type Payload struct {
	UserID     string
	SessionKey string
	ExpiredAt  time.Time
}

// IsExpired checks if expired
func (t *Payload) IsExpired() bool {
	return time.Now().After(t.ExpiredAt)
}

// DecodeToken decodes token string into payload data
func DecodeToken(tokenStr string, secretKey []byte) (token *Payload, err error) {
	if tokenStr == "" {
		return nil, errors.New("token is empty")
	}
	cipherBytes, err := base64.URLEncoding.DecodeString(tokenStr)
	if err != nil {
		return
	}

	result, err := crypto.TripleDesDecrypt(cipherBytes, secretKey)
	if err != nil {
		return
	}

	err = gob.NewDecoder(bytes.NewReader(result)).Decode(&token)
	if err != nil {
		return
	}

	return
}
