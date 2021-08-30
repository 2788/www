/**
 * @file gaea apis
 */

import { get, ApiException } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'

const apiPrefix = `${basePrefix}/gaea`

export interface UserInfo {
  customer_email: string
  customer_name: string
  full_name: string
  uid: number
  is_certified: boolean
}

/** 获取用户信息 */
export async function getUserInfo(): Promise<UserInfo> {
  const res = await get(`${apiPrefix}/api/developer-view/overview`)

  // TODO: 需要封装
  if (!(res && res.code === 200 && res.data)) {
    throw new ApiException(res, '获取用户信息失败')
  }

  return res.data
}
