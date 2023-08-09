package service

import (
	"errors"
	"fmt"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"strings"
	"time"

	"github.com/go-redis/redis/v7"
	"github.com/qiniu/xlog.v1"
	mongoClient "qiniu.com/rmb-web/admin-backend/mongo-api/client"
	"qiniu.com/rmb-web/puck/v3/utils/auth"

	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/models"
	"qiniu.com/www/admin-backend/service/lilliput"
	"qiniu.com/www/admin-backend/service/morse"
	"qiniu.com/www/admin-backend/utils"
)

const (
	redisKeyPrefix     = "www:admin-backend:send-msg:"
	redisKeyExpireTime = 10 // 单位：分钟
)

type CronJobService struct {
	conf            *config.Config
	redis           redis.UniversalClient
	mongoApiService *mongoClient.MongoApiServiceWithAuth
	morseService    *morse.MorseService
	lilliputService *lilliput.LilliputService
}

func NewCronJobService(conf *config.Config) *CronJobService {
	redisClient := redis.NewUniversalClient(
		&redis.UniversalOptions{Addrs: strings.Split(conf.RedisHosts, ",")})

	transport := auth.NewQiniuAuthTransport(conf.Admin.AccessKey, conf.Admin.SecretKey, http.DefaultTransport)
	host := []string{fmt.Sprintf("http://127.0.0.1:%d", conf.Port)}
	mongoService := mongoClient.NewMongoApiServiceWithAuth(host, conf.MongoApi.Prefix, transport)

	morseService := morse.NewMorseService(conf.MorseHost, conf.MorseClientId)
	lilliputService := lilliput.NewLilliputService(conf.LilliputHost, http.DefaultTransport)

	return &CronJobService{
		conf:            conf,
		morseService:    morseService,
		redis:           redisClient,
		mongoApiService: mongoService,
		lilliputService: lilliputService,
	}
}

func (f *CronJobService) batchSend(users []models.ActivityRegistration, activity models.PartOfMarketActivity,
	logger *xlog.Logger) (jobId string, err error) {

	in := make([]morse.SendSmsIn, 0)
	for _, user := range users {
		url := utils.GetCheckinLinkUrl(logger, f.lilliputService, f.conf.SMSTemplates.ActivityCheckinLinkPrefix,
			user.Id.Hex())
		data := map[string]interface{}{
			"Title":     activity.Title,
			"Link":      url,
			"StartTime": utils.FormatSecTime(activity.StartTime),
		}
		in = append(in, morse.SendSmsIn{
			TmplData:    data,
			PhoneNumber: user.PhoneNumber,
		})
	}
	return f.morseService.BatchSendSms(logger, in, f.conf.SMSTemplates.ActivityReminder)
}

func (f *CronJobService) tryLock(key string, value int64) (ok bool, err error) {
	ok, err = f.redis.SetNX(key, value, time.Minute*redisKeyExpireTime).Result()
	return
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
		time.Sleep(redisKeyExpireTime / 2 * time.Minute)
		select {
		case <-end:
			err := f.unlock(key, value)
			if err != nil {
				logger.Errorf("unlock key(%s) error :%v", key, err)
			}
			return
		default:
			err := f.redis.Expire(key, redisKeyExpireTime*time.Minute).Err()
			if err != nil {
				logger.Errorf("set expire key(%s) error :%v", key, err)
			}
		}
	}
}

// ---------------------------------------- 下面方法为最新提醒逻辑 ----------------------------------------

func (f *CronJobService) RunActivityReminder() {
	// 保证服务先跑起来以后再执行定时任务
	time.Sleep(5 * time.Second)
	ticker := time.NewTicker(time.Duration(f.conf.SendMessageTaskInterval) * time.Minute)

	for {
		logger := xlog.NewDummy()
		itemsMap, err := f.findActivityReminderItemsMap(logger)
		if err != nil {
			logger.Errorf("findActivityReminderItemsMap error: %v", err)
			return
		}

		for activityId, reminderIds := range itemsMap {
			// 添加分布式锁保证同一时间只有一个协程在处理当前活动
			key := fmt.Sprintf("%s%s", redisKeyPrefix, activityId)
			value := time.Now().UnixNano()
			ok, err := f.tryLock(key, value)
			if err != nil {
				logger.Errorf("tryLock key(%s) error: %v", key, err)
				continue
			}
			if !ok {
				logger.Warnf("tryLock key(%s) failed", key)
				continue
			}

			reminderEnd := make(chan bool, 1)
			// 定时给锁加过期时间或者释放锁
			go f.addLockExpireTimeOrUnlock(logger.SpawnWithCtx(), reminderEnd, key, value)

			f.sendWithReminderIds(logger.SpawnWithCtx(), activityId, reminderIds, reminderEnd)
		}
		<-ticker.C
	}
}

// activityReminderItemsMap 记录每个活动此时的提醒列表，key 是 `activityId`， value 是 `reminderId` 列表
// 大多数情况下在当前时刻同一个活动的提醒任务只有一条，如果上次提醒任务意外中止则此时同一个任务可能会出现多个 `reminderId`
type activityReminderItemsMap map[string][]string

// findReminderItems 查找可能需要发送提醒的 activityReminderItemsMap
func (f *CronJobService) findActivityReminderItemsMap(logger *xlog.Logger) (res activityReminderItemsMap, err error) {
	res = make(activityReminderItemsMap)

	// 查询可能需要发送提醒的所有活动
	now := time.Now().Unix()
	query := map[string]interface{}{
		"state":          models.Release,
		"enableReminder": true,
		"startTime":      bson.M{"$gt": now},
	}
	listQuery := mongoClient.ListQuery{
		Query: query,
	}

	var listRes struct {
		Data []models.PartOfMarketActivity `json:"data"`
	}
	err = f.mongoApiService.List(logger, f.conf.MarketActivityResourceName, listQuery, &listRes)
	if err != nil {
		return
	}
	// 判断活动在当前是否有提醒任务，如果有则将 activityId 与提醒列表 reminderIds 的映射关系存入返回结果中
	for _, activity := range listRes.Data {
		// 将活动按照 `reminderTime` 值从小到大排列，保证同一活动对应的提醒任务列表中的第一项为最满足当前提醒条件的提醒任务
		// 意义：后续发送活动提醒时，当一个活动有多个提醒任务时，只会按最迟（reminderTime 最小）的那个来做一次通知
		activity.Reminders.Sort()
		for _, reminder := range activity.Reminders {
			if reminder.NeedToSend(now, activity.StartTime) {
				res[activity.Id.Hex()] = append(res[activity.Id.Hex()], reminder.Id)
			}
		}
	}
	return
}

// sendWithReminderIds 根据 activityId 与 reminderIds 给报名用户发送活动提醒
func (f *CronJobService) sendWithReminderIds(logger *xlog.Logger, activityId string,
	reminderIds []string, reminderEnd chan bool) {

	defer func() {
		reminderEnd <- true
	}()

	// 查询当前活动提醒是否已完成
	var (
		activity models.PartOfMarketActivity
		index    int
		reminder models.Reminder
	)
	err := f.mongoApiService.Get(logger, f.conf.MarketActivityResourceName, activityId, &activity)
	if err != nil {
		logger.Errorf("mongoApiService get activityId(%s) error: %v", activityId, err)
		return
	}

	// indexes 用于存储需要发送的 reminder 在 `activity.Reminders` 数组中的索引位置
	var indexes []int
	for _, reminderId := range reminderIds {
		for index, reminder = range activity.Reminders {
			// 已完成提醒则不做任何处理
			if reminder.Id == reminderId && reminder.ReminderStatus != models.Succeeded {
				indexes = append(indexes, index)
				break
			}
			if index == len(activity.Reminders)-1 {
				logger.Errorf("activityId(%s)-reminderId(%s) not found", activityId, reminderId)
			}
		}
	}
	// 没有需要通知的 reminder
	if len(indexes) == 0 {
		logger.Infof("length of indexes is 0")
		return
	}

	// 更新活动表通知状态为正在进行中
	err = f.updateMarketActivityRemindersStatus(logger, &activity, indexes, models.InProgress)
	if err != nil {
		logger.Errorf("updateMarketActivityRemindersStatus InProgress error: %v", err)
		return
	}

	for {
		// 如果有多次 reminder 需要通知，只会通知 reminder time 最小的那次，并认为此次活动通知都已完成
		reminderId := activity.Reminders[indexes[0]].Id
		users, err := f.getReminderUsers(logger, activityId, reminderId, f.conf.SMSBatchLimit)
		if err != nil {
			logger.Errorf("getReminderUsers activityId(%s) error: %v", activity.Id.Hex(), err)
			return
		}

		if len(users) == 0 {
			break
		}

		jobId, err := f.batchSend(users, activity, logger)
		if err != nil {
			logger.Errorf("f.batchSend error: %v", err)
			return
		}
		// 更新用户报名表 reminders
		err = f.updateActivityRegistrationReminders(logger, users, reminderId, jobId)
		if err != nil {
			logger.Errorf("updateActivityRegistrationReminders error: %v", err)
		}

		if len(users) < f.conf.SMSBatchLimit {
			break
		}
	}

	// 更新活动表通知状态为已完成
	err = f.updateMarketActivityRemindersStatus(logger, &activity, indexes, models.Succeeded)
	if err != nil {
		logger.Errorf("updateMarketActivityRemindersStatus Succeeded error: %v", err)
	}
	return
}

// getReminderUsers 获取当前活动需要提醒的用户列表
func (f *CronJobService) getReminderUsers(logger *xlog.Logger, activityId, reminderId string,
	limit int) (users []models.ActivityRegistration, err error) {
	query := map[string]interface{}{
		"marketActivityId": activityId,
		"reminders.id":     bson.M{"$nin": []string{reminderId}},
	}
	listQuery := mongoClient.ListQuery{
		Limit: fmt.Sprint(limit),
		Query: query,
	}

	var listRes struct {
		Data []models.ActivityRegistration `json:"data"`
	}
	err = f.mongoApiService.List(logger, f.conf.ActivityRegistrationResourceName, listQuery, &listRes)
	return listRes.Data, err
}

// updateActivityRegistrationReminders 更新用户报名表，主要将 `reminderId` 及短信发送的 `jobId` 更新到相应字段
func (f *CronJobService) updateActivityRegistrationReminders(logger *xlog.Logger,
	activityRegs []models.ActivityRegistration, reminderId, jobId string) (err error) {

	var errStrList []string
	for _, activityReg := range activityRegs {
		activityReg.Reminders = append(activityReg.Reminders, models.ActivityRegistrationReminder{
			Id:       reminderId,
			SMSJobId: jobId,
		})
		update := bson.M{
			"reminders": activityReg.Reminders,
			"updatedAt": time.Now().Unix(),
		}
		err := f.mongoApiService.Update(logger, f.conf.ActivityRegistrationResourceName,
			activityReg.Id.Hex(), update, nil)
		if err != nil {
			logger.Errorf("update(%+v) error: %v", update, err)
			errStrList = append(errStrList, err.Error())
		}
	}
	if len(errStrList) != 0 {
		err = errors.New(strings.Join(errStrList, "; "))
	}

	return
}

// updateMarketActivityRemindersStatus 更新活动表提醒状态
// indexes 存储需要发送的 `reminder` 在 `activity.Reminders` 数组中的索引位置
func (f *CronJobService) updateMarketActivityRemindersStatus(logger *xlog.Logger, activity *models.PartOfMarketActivity,
	indexes []int, reminderStatus models.ReminderStatus) (err error) {

	for _, index := range indexes {
		activity.Reminders[index].ReminderStatus = reminderStatus
		activity.Reminders[index].UpdatedAt = time.Now().Unix()
	}
	update := map[string]interface{}{
		"reminders": activity.Reminders,
	}
	err = f.mongoApiService.Update(logger, f.conf.MarketActivityResourceName, activity.Id.Hex(), update, nil)
	if err != nil {
		logger.Errorf("mongoApiService update marketActivityId(%s) reminders(%+v) error: %v",
			activity.Id.Hex(), activity.Reminders, err)
		return
	}
	return
}
