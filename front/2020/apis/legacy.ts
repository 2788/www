/**
 * @file 老官网接口
 */

import { get, post } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'
import { timeout } from 'utils'

const apiPrefix = `${basePrefix}/www-legacy`

export type CreateDeveloperOptions = {
  resource_name: string
  resource_desc: string
  author_name: string
  phone: string
  im: string
  email: string
  website: string
  download_link: string
  doc_link: string
  sourcecode_link: string
}

/** 创建开发者合作申请 */
export function createDeveloperCooperation(options: CreateDeveloperOptions): Promise<void> {
  return post(`${apiPrefix}/cooperations/create_developer`, {
    developer_cooperation: options
  })
}

export type Userinfo = {
  email: string
  is_signin: true
  name: string
  uid: number
}

export type Guestinfo = {
  is_signin: false
}

/** 获取用户信息 */
export function getUserInfo(): Promise<Userinfo | Guestinfo> {
  return get(`${apiPrefix}/userinfo`)
}

export type CreateFeedbackOptions = {
  content: string // 咨询内容
  company: string // 公司名称
  name: string // 称呼
  phone: string // 电话
  email: string // 邮箱
  province: string // 地区
}

export async function createFeedback(options: CreateFeedbackOptions): Promise<void> {
  const referer = window.location.href
  if (typeof window === 'undefined') {
    await timeout(300)
    return
  }
  return post(`${apiPrefix}/feedbacks`, {
    feedback: {
      referer,
      ...options
    }
  })
}
