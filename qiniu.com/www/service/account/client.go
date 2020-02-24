package account

import (
    "net/http"
)

type Client struct {
    *http.Client
}
