package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2/bson"
	"html/template"
	"net/http"
	"net/url"
	"sync"
	"time"

	"github.com/go-redis/redis/v7"
	"github.com/qiniu/rpc.v1"
	"github.com/qiniu/xlog.v1"
	"qbox.us/api/message"
	mongoClient "qiniu.com/rmb-web/admin-backend/mongo-api/client"
	"qiniu.com/rmb-web/puck/v3/utils/auth"

	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/models"
)

const (
	MorseClientIdKey   = "Client-Id"
	RedisKeyPrefix     = "www:admin-backend:send-msg:"
	MaxGoroutine       = 10
	RedisKeyExpireTime = 10 // 单位：分钟
)

type CronJobService struct {
	conf            *config.Config
	redis           *redis.Client
	mongoApiService *mongoClient.MongoApiServiceWithAuth
	morseService    message.HandleNotification
}

func NewCronJobService(conf *config.Config) *CronJobService {
	morseClient := &rpc.Client{
		Client: &http.Client{
			Timeout: 30 * time.Second,
			Transport: &morseTransport{
				clientID:  conf.MorseClientId,
				transport: http.DefaultTransport,
			},
		},
	}
	redisClient := redis.NewClient(&redis.Options{Addr: conf.RedisHost, DB: conf.RedisDB})

	transport := auth.NewQiniuAuthTransport(conf.Admin.AccessKey, conf.Admin.SecretKey, http.DefaultTransport)
	host := []string{fmt.Sprintf("http://127.0.0.1:%d", conf.Port)}
	mongoService := mongoClient.NewMongoApiServiceWithAuth(host, conf.MongoApiPrefix, transport)

	morseService := message.HandleNotification{Host: conf.MorseHost, Client: morseClient}
	return &CronJobService{conf: conf, morseService: morseService, redis: redisClient, mongoApiService: mongoService}
}

func (f *CronJobService) Run() {
	// 保证服务先跑起来以后再执行定时任务
	time.Sleep(5 * time.Second)
	ticker := time.NewTicker(time.Duration(f.conf.SendMessageTaskInterval) * time.Minute)
	for {
		logger := xlog.NewDummy()
		activs, err := f.getNeedSendMsgActivs(logger)
		if err != nil {
			logger.Errorf("getNeedSendMsgActivs error :%v", err)
			return
		}

		ch := make(chan bool, MaxGoroutine)
		wg := &sync.WaitGroup{}
		for _, activ := range activs {
			var activity models.PartOfMarketActivity
			activity, err = interToPartOfMarketActiv(activ)
			if err != nil {
				logger.Errorf("interToPartOfMarketActiv error :%v", err)
				continue
			}

			// 添加分布式锁保证同一时间只有一个协程在处理当前活动
			key := fmt.Sprintf("%s%s", RedisKeyPrefix, activity.Id.Hex())
			value := time.Now().UnixNano()
			err = f.tryLock(key, value)
			if err != nil {
				logger.Errorf("tryLock key(%s) error :%v", key, err)
				continue
			}

			activEnd := make(chan bool)
			// 定时给锁加过期时间或者释放锁
			go f.addLockExpireTimeOrUnlock(logger.SpawnWithCtx(), activEnd, key, value)
			go f.send(logger.SpawnWithCtx(), wg, ch, activEnd, activity)
		}
		wg.Wait()
		<-ticker.C
	}
}

func (f *CronJobService) send(logger *xlog.Logger, wg *sync.WaitGroup, ch, activEnd chan bool, activity models.PartOfMarketActivity) {
	defer func() {
		wg.Done()
		<-ch
		activEnd <- true
	}()

	wg.Add(1)
	ch <- true

	// 查询当前任务是否已完成
	err := f.mongoApiService.Get(logger, f.conf.MarketActivityResourceName, activity.Id.Hex(), &activity)
	if err != nil {
		logger.Errorf("mongoApiService get activityId(%s) error :%v", activity.Id.Hex(), err)
		return
	}
	if activity.NoticeStatus == 2 {
		return
	}

	// 更新活动表通知状态为正在进行中
	update := map[string]interface{}{
		"noticeStatus": 1,
	}
	err = f.mongoApiService.Update(logger, f.conf.MarketActivityResourceName, activity.Id.Hex(), update, nil)
	if err != nil {
		logger.Errorf("mongoApiService update marketActivityId(%s) noticeStatus equals 1 error :%v", activity.Id.Hex(), err)
		return
	}

	for {
		usersInter, err := f.getNeedSendMsgUsers(logger, activity.Id.Hex(), f.conf.SMSBatchLimit)
		if err != nil {
			logger.Errorf("getNeedSendMsgUsers(%s) error :%v", activity.Id.Hex(), err)
			return
		}

		if usersInter == nil {
			break
		}

		users := make([]models.ActivityRegistration, len(usersInter))
		var ids []bson.ObjectId
		for index, userInter := range usersInter {
			user, err := interToActivRegist(userInter)
			if err != nil {
				logger.Errorf("%v interToActivRegist error :%v", usersInter, err)
				return
			}
			users[index] = user
			ids = append(ids, user.Id)
		}

		jobId, err := f.batchSend(users, activity, logger)
		if err != nil {
			return
		}
		// 用户报名表写入短信通知结果
		err = f.setSMSResult(logger, ids, jobId)
		if err != nil {
			return
		}

		if len(users) < f.conf.SMSBatchLimit {
			break
		}
	}

	// 更新活动表通知状态为已完成
	update = map[string]interface{}{
		"noticeStatus": 2,
	}
	err = f.mongoApiService.Update(logger, f.conf.MarketActivityResourceName, activity.Id.Hex(), update, nil)
	if err != nil {
		logger.Errorf("set marketActivityId(%s) noticeStatus equals 2 error :%v", activity.Id, err)
	}
	return
}

func (f *CronJobService) batchSend(users []models.ActivityRegistration, activity models.PartOfMarketActivity, logger *xlog.Logger) (jobId string, err error) {
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

func (f *CronJobService) setSMSResult(logger *xlog.Logger, ids []bson.ObjectId, jobId string) (err error) {
	queryMap := map[string]map[string]interface{}{
		"_id": {"$in": ids},
	}
	queryBson, err := bson.Marshal(queryMap)
	if err != nil {
		logger.Errorf("setSMSResult bson Marshal queryMap(%v) error :%v", queryMap, err)
		return
	}
	query := url.Values{"bsonQuery": []string{string(queryBson)}}
	updates := map[string]interface{}{"hasBeenSent": true, "smsJobId": jobId}

	err = f.mongoApiService.BatchUpdate(logger, f.conf.ActivityRegistrationResourceName, query, updates, nil)
	if err != nil {
		logger.Errorf("mongoApiService BatchUpdate ids(%v) error :%v", ids, err)
	}
	return
}

func (f *CronJobService) getNeedSendMsgActivs(logger *xlog.Logger) (activs []interface{}, err error) {
	now := time.Now().Unix()
	query := url.Values{
		"query": []string{fmt.Sprintf("{\"state\":1,\"enableReminder\":true,\"noticeStatus\":{\"$ne\":2},\"startTime\":{\"$gt\":%d}}", now)},
	}
	res, err := f.mongoApiService.List(logger, f.conf.MarketActivityResourceName, query)
	if err != nil {
		return
	}

	return res.Data, nil
}

func (f *CronJobService) getNeedSendMsgUsers(logger *xlog.Logger, activityId string, limit int) (users []interface{}, err error) {
	query := url.Values{
		"query": []string{fmt.Sprintf("{\"hasBeenSent\":{\"$eq\":false},\"marketActivityId\":\"%s\"}", activityId)},
		"limit": []string{fmt.Sprint(limit)},
	}
	res, err := f.mongoApiService.List(logger, f.conf.ActivityRegistrationResourceName, query)
	if err != nil {
		return
	}
	return res.Data, nil
}

func (f *CronJobService) tryLock(key string, value int64) error {
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

func (f *CronJobService) unlock(key string, value int64) error {
	return f.redis.Eval(unlockScript, []string{key}, value).Err()
}

func (f *CronJobService) addLockExpireTimeOrUnlock(logger *xlog.Logger, end chan bool, key string, value int64) {
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

func (f *CronJobService) render(data SMSData) (content string, err error) {
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
	if req.Header.Get(MorseClientIdKey) == "" {
		req.Header.Set(MorseClientIdKey, tr.clientID)
	}
	return tr.transport.RoundTrip(req)
}

func interToActivRegist(v interface{}) (activRegis models.ActivityRegistration, err error) {
	vBytes, err := json.Marshal(v)
	if err != nil {
		return
	}
	err = json.Unmarshal(vBytes, &activRegis)
	return
}

func interToPartOfMarketActiv(v interface{}) (activRegis models.PartOfMarketActivity, err error) {
	vBytes, err := json.Marshal(v)
	if err != nil {
		return
	}
	err = json.Unmarshal(vBytes, &activRegis)
	return
}
