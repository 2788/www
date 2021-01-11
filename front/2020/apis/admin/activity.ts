/**
 * @file 产品公告
 */

import { get, post } from 'utils/fetch'
import { ProgressState, locationMap } from 'constants/activity'
import { apiPrefix, wwwApiPrefix, handleResponseData } from '.'

export interface IActivity {
  id: string
  title: string // 标题
  imgUrl: string // 图片
  desc: string // 简介
  startTime: string // 活动开始时间
  endTime: string // 活动结束时间
  applyEndTime: string // 报名截止时间
  detail: string // 详情
  progressState: string // 活动进行状态
  location: string // 地点
  isOverApplyTime: boolean // 是否超过报名时间
}

interface IActivityRes {
  _id: string
  title: string // 标题
  imgUrl: string // 图片
  desc: string // 简介
  state: number // 0:draft || 1:release
  startTime: number // 活动开始时间
  endTime: number // 活动结束时间
  applyEndTime: number // 报名截止时间
  editTime: number // 修改时间
  detail: string // 详情
  detailUrlPrefix: string // 详情页面 url 前缀
  enableReminder: boolean // 是否提醒
  reminderTime: number // 活动开始前多少分钟提醒
  noticeStatus: number // 通知状态,默认为 0
  location: string // 地点
}

// 根据 id 获取开发者活动
export function getActivityById(id: string): Promise<IActivity> {
  return get(apiPrefix + '/www-market-activity/' + id)
    .then(data => genDisplayList([data])[0])
}

interface IListRes {
  count: number
  data: IActivity[]
}

interface IListOptions {
  page: number
  pageSize: number
}

// 获取开发者活动列表
export function getActivities({ page, pageSize }: IListOptions): Promise<IListRes> {
  const options = { query: JSON.stringify({ state: 1 }), limit: pageSize, offset: (page - 1) * pageSize, sort: '-editTime' }
  return get(apiPrefix + '/www-market-activity', options)
    .then(res => ({ count: res.count || 0, data: genDisplayList(handleResponseData(res)) }))
}

export interface IRegistrationOptions {
  userName: string
  phoneNumber: string
  email: string
  company: string
  marketActivityId: string
}
// 创建报名信息
export function createRegistration(options: IRegistrationOptions): Promise<void> {
  return post(wwwApiPrefix + '/activity-registration', options)
}

function genDisplayList(list: IActivityRes[]): IActivity[] {
  const res: IActivity[] = []
  const nowTime = Math.floor(new Date().getTime() / 1000) // 取秒数
  for (const item of list) {
    const sTime = item.startTime
    const eTime = item.endTime
    let state
    if (nowTime < sTime) {
      state = ProgressState.Start
    } else if (nowTime > eTime) {
      state = ProgressState.End
    } else {
      state = ProgressState.Mid
    }
    res.push({
      // eslint-disable-next-line no-underscore-dangle
      id: item._id,
      title: item.title,
      imgUrl: item.imgUrl,
      desc: item.desc,
      startTime: formatTime(item.startTime),
      endTime: formatTime(item.endTime),
      applyEndTime: formatTime(item.applyEndTime),
      detail: item.detail,
      progressState: state,
      location: locationMap[item.location] || item.location,
      isOverApplyTime: nowTime > item.applyEndTime
    })
  }
  return res
}

function formatTime(time: number): string {
  const date = new Date(time * 1000)
  return `${date.getFullYear()}-${fillSpace(date.getMonth() + 1)}-${fillSpace(date.getDate())} ${fillSpace(date.getHours())}:${fillSpace(date.getMinutes())}`
}

// 补 0
function fillSpace(num: number): string {
  return num >= 10 ? num.toString() : '0' + num
}