package service

import (
	"bytes"
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/go-redis/redis/v7"
	"github.com/qiniu/rpc.v1"
	"github.com/qiniu/xlog.v1"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"html/template"
	"qbox.us/api/message"

	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/models"
)

const (
	ClientIdKey        = "Client-Id"
	RedisKeyPrefix     = "www:admin-backend:send-msg:"
	MaxGoroutine       = 10
	RedisKeyExpireTime = 10 // 单位：分钟
)

type FixedTimeService struct {
	conf         *config.Config
	session      *mgo.Session
	redis        *redis.Client
	morseService message.HandleNotification
}

func NewFixedTimeService(sess *mgo.Session, conf *config.Config) *FixedTimeService {
	morseClient := &rpc.Client{
		Client: &http.Client{
			Timeout: 30 * time.Second,
			Transport: &morseTransport{
				clientID:  conf.MorseClientId,
				transport: http.DefaultTransport,
			},
		},
	}
	redisClient := redis.NewClient(&redis.Options{Addr: conf.RedisHost})
	morseService := message.HandleNotification{Host: conf.MorseHost, Client: morseClient}
	return &FixedTimeService{session: sess, conf: conf, morseService: morseService, redis: redisClient}
}

func (f *FixedTimeService) Task() {
	ticker := time.NewTicker(time.Duration(f.conf.SendMessageTaskInterval) * time.Minute)
	for {
		logger := xlog.NewDummy()
		activs, err := f.getNeedSendMsgActivs()
		if err != nil {
			logger.Errorf("getNeedSendMsgActivs error :%v", err)
			return
		}

		ch := make(chan bool, MaxGoroutine)
		wg := &sync.WaitGroup{}
		for _, activ := range activs {
			// 添加分布式锁保证同一时间只有一个协程在处理当前活动
			key := fmt.Sprintf("%s%s", RedisKeyPrefix, activ.Id.Hex())
			value := time.Now().UnixNano()
			err = f.tryLock(key, value)
			if err != nil {
				logger.Errorf("tryLock key(%s) error :%v", key, err)
				continue
			}

			activEnd := make(chan bool)
			// 定时给锁加过期时间或者释放锁
			go f.addLockExpireTimeOrUnlock(logger.SpawnWithCtx(), activEnd, key, value)
			go f.send(logger.SpawnWithCtx(), wg, ch, activEnd, activ)
		}
		wg.Wait()
		<-ticker.C
	}
}

func (f *FixedTimeService) send(logger *xlog.Logger, wg *sync.WaitGroup, ch, activEnd chan bool, activity models.MarketActivity) {
	defer func() {
		wg.Done()
		<-ch
		activEnd <- true
	}()

	wg.Add(1)
	ch <- true

	newSession := f.session.Copy()
	defer newSession.Close()

	// 查询当前任务是否已完成
	err := newSession.DB("").C(f.conf.MarketActivityCollection).Find(bson.M{"_id": activity.Id, "noticeStatus": 2}).One(nil)
	if err == nil {
		return
	}
	if err != mgo.ErrNotFound {
		logger.Errorf("%s find error :%v", f.conf.MarketActivityCollection, err)
		return
	}

	// 更新活动表通知状态为正在进行中
	err = newSession.DB("").C(f.conf.MarketActivityCollection).Update(bson.M{"_id": activity.Id}, bson.M{"$set": bson.M{"noticeStatus": 1}})
	if err != nil {
		logger.Errorf("set marketActivityId(%s) noticeStatus equals 1 error :%v", activity.Id, err)
		return
	}

	users, err := f.getNeedSendMsgUsers(activity.Id)
	if err != nil {
		logger.Errorf("getNeedSendMsgUsers error :%v", err)
		return
	}

	smsBatchLimit := f.conf.SMSBatchLimit
	start := 0
	if len(users) > smsBatchLimit {
		count := 0
		for ; count < len(users)/smsBatchLimit; count++ {
			tmpUsers := users[count*smsBatchLimit : (count+1)*smsBatchLimit]
			jobId, err := f.batchSend(tmpUsers, activity, logger)
			if err != nil {
				return
			}
			// 用户报名表写入短信通知结果
			err = f.setSMSResult(logger, tmpUsers, jobId)
			if err != nil {
				return
			}
		}
		start = count * smsBatchLimit
	}
	tmpUsers := users[start:]
	if len(tmpUsers) > 0 {
		jobId, err := f.batchSend(tmpUsers, activity, logger)
		if err != nil {
			return
		}
		// 用户报名表写入短信通知结果
		err = f.setSMSResult(logger, tmpUsers, jobId)
		if err != nil {
			return
		}
	}

	// 更新活动表通知状态为已完成
	err = newSession.DB("").C(f.conf.MarketActivityCollection).Update(bson.M{"_id": activity.Id}, bson.M{"$set": bson.M{"noticeStatus": 2}})
	if err != nil {
		logger.Errorf("set marketActivityId(%s) noticeStatus equals 2 error :%v", activity.Id, err)
	}
	return
}

func (f *FixedTimeService) batchSend(users []models.ActivityRegistration, activity models.MarketActivity, logger *xlog.Logger) (jobId string, err error) {
	in := make([]message.SendSmsIn, 0)
	for _, user := range users {
		data := SMSData{
			UserName:  user.UserName,
			Title:     activity.Title,
			StartTime: time.Unix(activity.StartTime, 0).Format("2006-01-02 15:04:05"),
			DetailUrl: fmt.Sprintf("%s/%s", activity.DetailUrlPrefix, activity.Id.Hex()),
		}
		content, err := f.render(data)
		if err != nil {
			logger.Errorf("render data(%v) error :%v", data, err)
			continue
		}
		in = append(in, message.SendSmsIn{
			PhoneNumber: user.PhoneNumber,
			Message:     content,
		})
	}
	resp, err := f.morseService.BatchSendSms(logger, in)
	if err != nil {
		logger.Errorf("BatchSendSms error :%v", err)
		return
	}
	return resp.JobID, nil
}

func (f *FixedTimeService) setSMSResult(logger *xlog.Logger, users []models.ActivityRegistration, jobId string) (err error) {
	newSession := f.session.Copy()
	defer newSession.Close()
	var ids []bson.ObjectId
	for _, user := range users {
		ids = append(ids, user.Id)
	}
	_, err = newSession.DB("").C(f.conf.ActivityRegistrationCollection).UpdateAll(bson.M{"_id": bson.M{"$in": ids}}, bson.M{"$set": bson.M{"has_been_sent": true, "smsJobId": jobId}})
	if err != nil {
		logger.Errorf("setSMSResult error :%v", err)
	}
	return
}

func (f *FixedTimeService) getNeedSendMsgActivs() (activs []models.MarketActivity, err error) {
	newSession := f.session.Copy()
	defer newSession.Close()

	c := newSession.DB("").C(f.conf.MarketActivityCollection)
	now := time.Now().Unix()
	err = c.Find(bson.M{
		"state":          1,
		"enableReminder": true,
		"noticeStatus":   bson.M{"$ne": 2},
		"startTime":      bson.M{"$gt": now},
		"$where":         fmt.Sprintf("this.startTime <= this.reminderTime+%d", now),
	}).All(&activs)
	return
}

func (f *FixedTimeService) getNeedSendMsgUsers(activityId bson.ObjectId) (users []models.ActivityRegistration, err error) {
	newSession := f.session.Copy()
	defer newSession.Close()

	c := newSession.DB("").C(f.conf.ActivityRegistrationCollection)
	err = c.Find(bson.M{
		"has_been_sent":    bson.M{"$eq": false},
		"marketActivityId": activityId.Hex(),
	}).All(&users)
	return
}

func (f *FixedTimeService) tryLock(key string, value int64) error {
	ok, err := f.redis.SetNX(key, value, time.Minute*RedisKeyExpireTime).Result()
	if err != nil {
		return err
	}
	if !ok {
		return fmt.Errorf("redis SetNX not ok")
	}
	return nil
}

var unlockScript = `
if redis.call("get",KEYS[1]) == ARGV[1]
then
    return redis.call("del",KEYS[1])
else
    return 0
end
`

func (f *FixedTimeService) unlock(key string, value int64) error {
	return f.redis.Eval(unlockScript, []string{key}, value).Err()
}

func (f *FixedTimeService) addLockExpireTimeOrUnlock(logger *xlog.Logger, end chan bool, key string, value int64) {
	for {
		time.Sleep(RedisKeyExpireTime / 2 * time.Minute)
		select {
		case <-end:
			err := f.unlock(key, value)
			if err != nil {
				logger.Errorf("unlock key(%s) error :%v", key, err)
			}
			return
		default:
			err := f.redis.Expire(key, RedisKeyExpireTime*time.Minute).Err()
			if err != nil {
				logger.Errorf("set expire key(%s) error :%v", key, err)
			}
		}
	}
}

type SMSData struct {
	UserName  string
	Title     string
	StartTime string
	DetailUrl string
}

func (f *FixedTimeService) render(data SMSData) (content string, err error) {
	t, err := template.New("default").Parse(f.conf.SMSTemplate)
	if err != nil {
		return
	}
	buff := bytes.NewBuffer(nil)
	err = t.Execute(buff, data)
	if err != nil {
		return
	}
	content = buff.String()
	return
}

type morseTransport struct {
	clientID  string
	transport http.RoundTripper
}

func (tr *morseTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	if tr.transport == nil {
		tr.transport = http.DefaultTransport
	}
	if req.Header.Get(ClientIdKey) == "" {
		req.Header.Set(ClientIdKey, tr.clientID)
	}
	return tr.transport.RoundTrip(req)
}
