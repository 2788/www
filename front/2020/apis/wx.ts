/**
 * @file          wx
 * @description   微信相关接口
 * @author        renpanpan
 */

import { post } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'

const portalApiPrefix = `${basePrefix}/portal-v4`

export interface IWechatConfig {
  app_id: string
  nonce_str: string
  signature: string
  timestamp: number
}

type GetConfigResponse = {
  code: number
  data?: IWechatConfig
  messagge: string
}

// param:url 为当前页面的 url
export async function getConfig(url: string): Promise<IWechatConfig> {
  const res: GetConfigResponse = await post(`${portalApiPrefix}/api/gaea/wechat/marketing/config`, { url })
  if (res.code !== 200 || !res.data) {
    throw new Error(res.messagge)
  }
  return res.data
}
