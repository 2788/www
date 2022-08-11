import moment from 'moment'
import { injectable } from 'qn-fe-core/di'

import BaseClient, { RefreshOptions } from 'apis/base-client'
import { apiMongo } from 'constants/api-prefix'
import { wwwHost } from 'constants/env'
import { StateType } from 'constants/activity'

// 一次请求最大返回条数，依赖于后台配置的 batch_limit
const batchLimit = 1000

const detailUrlPrefix = wwwHost + '/activity/detail?id='

export interface IReminder {
  id: string // 唯一 id
  reminderTime: number // 活动开始前多少分钟提醒
  reminderStatus: number // 0: 未提醒，1:开始提醒，2:提醒完成
  createdAt: number // 创建提醒的时间，单位为秒
  updatedAt: number // 更新提醒的时间，单位为秒
}

export interface ISession {
  id: string // 唯一 id
  title: string // 场次标题
}

export interface IActivity {
  title: string // 标题
  imgUrl: string // 图片
  desc: string // 简介
  state: StateType // 发布状态
  startTime: number // 活动开始时间，单位为秒
  endTime: number // 活动结束时间，单位为秒
  applyEndTime: number // 报名截止时间，单位为秒
  noLoginRequired: boolean // 代表活动是否不需要登录，默认为需要登录
  editTime: number // 修改时间，单位为秒
  detail: string // 详情
  detailUrlPrefix?: string // 详情页面 url 前缀
  enableReminder: boolean // 是否提醒
  reminders: IReminder[] // 活动提醒数组
  location: string // 地点
  // todo；此处为可选是为了兼容老数据
  sessions?: ISession[] // 活动场次数组
}
export interface IActivityWithId extends IActivity {
  _id: string
}

export interface IListOptions {
  limit: number
  offset: number
  states?: StateType[]
}

export interface IListResponse {
  count: number
  data: IActivityWithId[]
}

export interface IRegistration {
  checkedIn: boolean // 是否已签到
  userName: string // 报名人姓名
  phoneNumber: string // 手机号
  email: string // 邮箱
  company: string // 公司
  location: string // 所在地
  industry: string // 所在行业
  department: string // 部门
  position: string // 职位
  relationship: string // 与七牛的关系
  createdAt: number // 创建时间，单位为秒
}

export interface IScanner {
  _id: string
  startTime: number // 链接有效期开始时间，单位为秒
  endTime: number // 链接有效期结束时间，单位为秒
}

const refreshPathsOptions: RefreshOptions = { wwwRefresh: ['/activity', '/sitemap.xml'] }

@injectable()
export default class ActivityApis {

  constructor(private client: BaseClient) { }

  add(options: IActivity): Promise<void> {
    options = { ...options, ...{ detailUrlPrefix, editTime: moment().unix() } }
    return this.client.post(apiMongo + '/www-market-activity', options, refreshPathsOptions)
  }

  update(options: IActivity, id: string): Promise<void> {
    options = { ...options, ...{ detailUrlPrefix, editTime: moment().unix() } }
    return this.client.put(apiMongo + '/www-market-activity/' + id, options, refreshPathsOptions)
  }

  delete(id: string): Promise<void> {
    return this.client.delete(apiMongo + '/www-market-activity/' + id, refreshPathsOptions)
  }

  list({ limit, offset, states = [] }: IListOptions): Promise<IListResponse> {
    const query = states.length > 0 ? { query: JSON.stringify({ state: { $in: states } }) } : null
    const options = { ...query, limit, offset, sort: '-editTime,-startTime' }
    return this.client.get<IListResponse>(apiMongo + '/www-market-activity', options)
      .then(res => (res.data ? res : { ...res, data: [] }))
  }

  // 获取注册信息总量
  getRegistrationsCount(id: string): Promise<number> {
    const options = { query: JSON.stringify({ marketActivityId: id }), limit: 1 }
    return this.client.get<{ count: number }>(apiMongo + '/www-activity-registration', options).then(res => res.count)
  }

  // 获取所有注册信息
  getRegistrations(id: string, total: number): Promise<IRegistration[]> {
    const options = { query: JSON.stringify({ marketActivityId: id }) }
    const pArr: Array<Promise<IRegistration[]>> = []
    for (let i = 0; i < total / batchLimit; i++) {
      pArr.push(
        this.client.get<{ data: IRegistration[] }>(
          apiMongo + '/www-activity-registration',
          { ...options, limit: batchLimit, offset: i * batchLimit }
        ).then(res => (res.data || []))
      )
    }
    return Promise.all(pArr).then(res => {
      const arr: IRegistration[] = []
      res.forEach(item => arr.push(...item))
      return arr
    })
  }

  // 创建一条用于扫码页面的数据
  createScanner(): Promise<IScanner> {
    const opts = {
      startTime: moment().unix(),
      endTime: moment().add(3, 'day').unix()
    }
    return this.client.post(apiMongo + '/www-activity-check-in-qr-code-scanner', opts, refreshPathsOptions)
  }
}
