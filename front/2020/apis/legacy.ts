/**
 * @file 老官网接口
 */

import { get, post } from 'utils/fetch'
import { apiHost } from 'constants/env'

const apiPrefix = `${apiHost}/www-legacy`

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
