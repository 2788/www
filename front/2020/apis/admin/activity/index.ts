/**
 * @file 产品公告
 */

import { get, getCode, post } from 'utils/fetch'
import { ProgressState, locationMap } from 'constants/activity'
import { ButtonClickWebLink, ButtonClickConsult } from 'hooks/product-btn'
import { ActivityComponentName } from 'constants/activity/components'
import { mongoApiPrefix, wwwApiPrefix, handleResponseData } from '..'

export interface ISession {
  id: string // 唯一 id
  title: string // 场次标题
}

export type PageType = 'RMB' | 'PAGE'

export interface ActivitySection {
  /** section 内容的 key，当前区块在可导航区域中的唯一标示，也会用来作为 URL hash 的值 */
  name: string
  /** section 内容标题，即对应 tab 项中的文本内容 */
  title: string
  /** section 内容副标题 */
  subtitle: string

  component: {
    /** 组件名称，组件被 Section 包裹 */
    name: ActivityComponentName
    /** 组件参数 */
    props: unknown
  }
}

// 活动页
export interface IActivityPage {
  // TODO: 后续用新的 mongo api 按需裁剪，相关升级参考产品配置页
  /** 解决方案页 banner 配置 */
  banner?: {
    bgImgUrl: {
      large: string
      small?: string
    }
    bgColor: string
    /** 是否为浅色风格（默认深色风格）；浅色风格对应深色按钮和深色文字，深色风格反之 */
    light?: boolean
  } | null
  /** 解决方案页底部使用引导模块 */
  usageGuide?: {
    title: string
    desc?: string
    button: {
      text: string
      click: ButtonClickWebLink | ButtonClickConsult
    }
  } | null
  /** 活动页组件列表配置 */
  sections: ActivitySection[]
}

export interface IActivity {
  id: string
  title: string // 标题
  imgUrl: string // 图片
  desc: string // 简介
  startTime: string // 活动开始时间，单位为秒
  endTime: string // 活动结束时间，单位为秒
  applyEndTime: string // 报名截止时间，单位为秒
  noLoginRequired: boolean // 代表活动是否不需要登录，默认为需要登录
  progressState: string // 活动进行状态
  location: string // 地点
  isOverApplyTime: boolean // 是否超过报名时间
  sessions: ISession[] // 活动场次数组

  pageType?: PageType
  // 富媒体格式的活动页
  detail?: string
  // 自定义的活动页
  page?: IActivityPage
}

export interface IReminder {
  id: string // 唯一 id
  reminderTime: number // 活动开始前多少分钟提醒
  reminderStatus: number // 0: 未提醒，1:开始提醒，2:提醒完成
  createdAt: number // 创建提醒的时间，单位为秒
  updatedAt: number // 更新提醒的时间，单位为秒
}

interface IActivityRes {
  _id: string
  title: string // 标题
  imgUrl: string // 图片
  desc: string // 简介
  state: number // 0:draft || 1:release
  startTime: number // 活动开始时间，单位为秒
  endTime: number // 活动结束时间，单位为秒
  applyEndTime: number // 报名截止时间，单位为秒
  noLoginRequired: boolean // 代表活动是否不需要登录，默认为需要登录
  editTime: number // 修改时间，单位为秒
  detailUrlPrefix: string // 详情页面 url 前缀
  enableReminder: boolean // 是否提醒
  reminders: IReminder[] // 活动开始前多少分钟提醒
  location: string // 地点
  sessions?: ISession[] // 活动场次数组

  pageType?: PageType
  // 富媒体格式的活动页
  detail?: string
  // 自定义的活动页
  page?: IActivityPage
}

// 根据 id 获取市场活动
export async function getActivityById(id: string): Promise<IActivity | null> {
  // catch 掉接口 404 错误
  try {
    const data = await get(mongoApiPrefix + '/www-market-activity/' + id)
    return genDisplayList([data])[0]
  } catch (err) {
    if (Number(getCode(err)) === 404) {
      return null
    }
    throw err
  }
}

interface IListRes {
  count: number
  data: IActivity[]
}

interface IListOptions {
  page: number
  pageSize: number
}

// 获取市场活动列表
export function getActivities({ page, pageSize }: IListOptions): Promise<IListRes> {
  const options = { query: JSON.stringify({ state: 1 }), limit: pageSize, offset: (page - 1) * pageSize, sort: '-editTime' }
  return get(mongoApiPrefix + '/www-market-activity', options)
    .then(res => ({ count: res.count || 0, data: genDisplayList(handleResponseData(res)) }))
}

export interface IRegistrationInfo {
  checkedIn: boolean // 是否已签到
  userName: string // 报名人姓名
  phoneNumber: string // 手机号
  email: string // 邮箱
  location: string // 地区
  extraForm: Record<string, string | null>
  createdAt: number // 创建时间，单位为秒
}

export function getRegistrationInfo(registrationId: string): Promise<IRegistrationInfo> {
  return get(`${mongoApiPrefix}/www-activity-registration/${registrationId}`)
}

export interface IRegistrationOptions {
  marketActivityId: string // 活动 id
  marketActivitySessionId: string | null // 场次信息
  userName: string // 报名人姓名
  phoneNumber: string // 手机号
  email: string // 邮箱
  location: string // 地区
  isReaded: boolean // 已同意协议
  extraForm: Record<string, string | null>
}

// 创建报名信息
export function createRegistration(options: IRegistrationOptions): Promise<void> {
  return post(wwwApiPrefix + '/activity-registration', { ...options })
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
      noLoginRequired: item.noLoginRequired,
      progressState: state,
      location: locationMap[item.location] || item.location,
      isOverApplyTime: nowTime > item.applyEndTime,
      sessions: item.sessions || [],

      pageType: item.pageType || 'RMB',
      detail: item?.detail || '',
      page: item?.page || null!
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
