package account

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "net/url"
    . "strconv"

    "qiniu.com/www/utils/oauth"
)

type AdminService interface {
    Transport() *oauth.Transport
    GetAccInfo(param AccGetter) (*AccInfo, error)
    GetAccInfoByToken(token string) (*AccInfo, error)
    GetAccInfos(uids []uint32) (infos map[uint32]AccInfo, err error)
    SetUserFreezeStatus(uid uint32, freezeType int, reason string) error
    Client() *Client
    Auth() error
}

type adminService struct {
    accountHost  string
    clientId     string
    clientSecret string
    username     string
    password     string
    transport    *oauth.Transport
    client       *Client
    authorized   bool
}

var _ AdminService = &adminService{}

func NewAdminService(host, clientId, clientSecret, username, password string) AdminService {
    return &adminService{
        accountHost:  host,
        clientId:     clientId,
        clientSecret: clientSecret,
        username:     username,
        password:     password,
    }
}

func (s *adminService) Client() *Client {
    s.Auth()
    if s.client == nil {
        s.client = &Client{
            &http.Client{
                Transport: s.Transport(),
            },
        }
    }
    s.Auth()
    return s.client
}

func (s *adminService) Transport() *oauth.Transport {
    if s.transport == nil {
        s.transport = &oauth.Transport{
            Config: &oauth.Config{
                ClientId:     s.clientId,
                ClientSecret: s.clientSecret,
                Scope:        "Scope",
                AuthURL:      "<AuthURL>",
                TokenURL:     s.accountHost + "/oauth2/token",
                RedirectURL:  "<RedirectURL>",
            },
            Transport: http.DefaultTransport, // it is default
        }
    }
    return s.transport
}

func (s *adminService) Auth() (err error) {
    if !s.authorized {
        tr := s.Transport()
        _, _, err = tr.ExchangeByPassword(s.username, s.password)
        s.authorized = true
    }
    return
}

type AccGetter struct {
    Email string
    UID   uint32
}

func (a *AccGetter) Values() url.Values {
    values := url.Values{}

    if a.Email != "" {
        values.Set("id", a.Email)
    }

    if a.UID != 0 {
        values.Set("uid", FormatUint(uint64(a.UID), 10))
    }

    return values
}

func (s *adminService) GetAccInfo(param AccGetter) (info *AccInfo, err error) {
    err = s.Auth()
    if err != nil {
        return
    }
    client := s.Client()
    resp, err := client.PostForm(s.accountHost+"/admin/user/info", param.Values())
    if err != nil {
        return
    }
    defer resp.Body.Close()
    if resp.StatusCode != 200 {
        body, _ := ioutil.ReadAll(resp.Body)
        err = fmt.Errorf("response status: %s, body: %s", resp.Status, string(body))
        return
    }
    info = &AccInfo{}
    decoder := json.NewDecoder(resp.Body)
    err = decoder.Decode(info)
    return
}

func (s *adminService) GetAccInfos(uids []uint32) (infos map[uint32]AccInfo, err error) {
    err = s.Auth()
    if err != nil {
        return
    }
    infos = map[uint32]AccInfo{}
    infoArray := []AccInfo{}
    uidStrs := []string{}
    for _, uid := range uids {
        uidStrs = append(uidStrs, FormatUint(uint64(uid), 10))
    }
    client := s.Client()
    resp, err := client.PostForm(s.accountHost+"/admin/users", map[string][]string{
        "uids": uidStrs,
    })
    if err != nil {
        return
    }
    defer resp.Body.Close()
    if resp.StatusCode != 200 {
        body, _ := ioutil.ReadAll(resp.Body)
        err = fmt.Errorf("response status: %s, body: %s", resp.Status, string(body))
        return
    }
    decoder := json.NewDecoder(resp.Body)
    err = decoder.Decode(&infoArray)
    if err != nil {
        return
    }
    for _, info := range infoArray {
        infos[info.Uid] = info
    }
    return
}

func (s *adminService) GetAccInfoByToken(token string) (info *AccInfo, err error) {
    req, err := http.NewRequest(http.MethodGet, s.accountHost+"/user/info", nil)
    if err != nil {
        return
    }

    req.Header.Set("Authorization", "Bearer "+token)
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return
    }
    defer resp.Body.Close()

    if resp.StatusCode != 200 {
        body, _ := ioutil.ReadAll(resp.Body)
        err = fmt.Errorf("response status: %s, body: %s", resp.Status, string(body))
        return
    }

    info = &AccInfo{}
    err = json.NewDecoder(resp.Body).Decode(info)
    return
}

func (s *adminService) SetUserFreezeStatus(uid uint32, freezeType int, reason string) (err error) {
    err = s.Auth()
    if err != nil {
        return
    }

    var (
        resp        *http.Response
        client      = s.Client()
        disableType = DisabledType(freezeType - 1)
    )

    if disableType.IsFrozen() {
        if !disableType.IsValid() {
            err = fmt.Errorf("unknown freeze type: %d", freezeType)
            return
        }
        resp, err = client.PostForm(s.accountHost+"/admin/user/disable", map[string][]string{
            "uid":    {FormatUint(uint64(uid), 10)},
            "reason": {reason},
            "type":   {disableType.String()},
        })
    } else {
        resp, err = client.PostForm(s.accountHost+"/admin/user/force_enable", map[string][]string{
            "uid": {FormatUint(uint64(uid), 10)},
        })

    }

    if err != nil {
        return
    }

    defer resp.Body.Close()
    if resp.StatusCode != 200 {
        body, _ := ioutil.ReadAll(resp.Body)
        err = fmt.Errorf("response status: %s, body: %s", resp.Status, string(body))
        return
    }
    return
}