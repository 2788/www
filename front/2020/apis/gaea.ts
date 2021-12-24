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

interface GetUserInfoBody {
  code: number
  data?: UserInfo
}

export enum GetUserInfoErrorCode {
  Unauthorized = 401
}

/** 获取用户信息 */
export async function getUserInfo(): Promise<UserInfo> {
  const res: GetUserInfoBody = await get(`${apiPrefix}/api/developer-view/overview`)
  if (res.code !== 200) {
    throw new ApiException(res, '获取用户信息失败', res.code)
  }
  return res.data!
}
