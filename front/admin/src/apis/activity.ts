import { injectable } from 'qn-fe-core/di'
import moment from 'moment'
import FetchStore from 'stores/fetch'
import { apiMongo } from 'constants/api-prefix'
import { detailUrlPrefix } from 'constants/env'
import { StateType, pageSize } from 'constants/activity'

// 一次请求最大返回条数，依赖于后台配置的 batch_limit
const limit = 1000

export interface IActivity {
  title: string // 标题
  imgUrl: string // 图片
  desc: string // 简介
  state: StateType // 发布状态
  startTime: number // 活动开始时间
  endTime: number // 活动结束时间
  applyEndTime: number // 报名截止时间
  editTime: number // 修改时间
  detail: string // 详情
  detailUrlPrefix?: string // 详情页面 url 前缀
  enableReminder: boolean // 是否提醒
  reminderTime: number // 活动开始前多少分钟提醒
  noticeStatus?: number // 通知状态,默认为 0
  location: string // 地点
}
export interface IActivityWithId extends IActivity {
  _id: string
}

export interface IListOptions {
  page: number
  states?: StateType[]
}

export interface IListResponse {
  count: number
  data: IActivityWithId[]
}

export interface IUser {
  userName: string
  phoneNumber: string
  email: string
  company: string
  createdAt: number
}

@injectable()
export default class ActivityApis {

  constructor(private fetchStore: FetchStore) { }

  add(options: IActivity): Promise<void> {
    options = { ...options, ...{ detailUrlPrefix, editTime: moment().unix(), noticeStatus: 0 } }
    return this.fetchStore.postJSON(apiMongo + '/www-market-activity', options)
  }

  update(options: IActivity, id: string): Promise<void> {
    options = { ...options, ...{ detailUrlPrefix, editTime: moment().unix() } }
    return this.fetchStore.putJSON(apiMongo + '/www-market-activity/' + id, options)
  }

  delete(id: string): Promise<void> {
    return this.fetchStore.delete(apiMongo + '/www-market-activity/' + id)
  }

  list({ page, states = [] }: IListOptions): Promise<IListResponse> {
    const query = states.length > 0 ? { query: JSON.stringify({ state: { $in: states } }) } : null
    const options = { ...query, limit: pageSize, offset: (page - 1) * pageSize, sort: '-editTime,-startTime' }
    return this.fetchStore.get(apiMongo + '/www-market-activity', options)
      .then(res => (res.data ? res : { ...res, data: [] }))
  }

  // 获取注册用户总量
  getUserCount(id: string): Promise<number> {
    const options = { query: JSON.stringify({ marketActivityId: id }), limit: 1 }
    return this.fetchStore.get(apiMongo + '/www-activity-registration', options).then(res => res.count)
  }

  // 获取注册的所有用户
  getAllUsers(id: string, total: number): Promise<IUser[]> {
    const options = { query: JSON.stringify({ marketActivityId: id }) }
    const pArr: Array<Promise<IUser[]>> = []
    for (let i = 0; i < total / limit; i++) {
      pArr.push(
        this.fetchStore.get(apiMongo + '/www-activity-registration', { ...options, limit, offset: i * limit })
          .then(res => (res.data || []))
      )
    }
    return Promise.all(pArr).then(res => {
      const arr: IUser[] = []
      res.forEach(item => arr.push(...item))
      return arr
    })
  }
}
