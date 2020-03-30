/**
 * @file constants of host
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { isDev } from './env'

enum portalHosts {
  Staging = 'http://portalv4.dev.qiniu.io', // 测试环境
  Production = 'https://portal.qiniu.com' // 线上环境
}

enum ssoHosts {
  Staging = 'https://sso-dev.qiniu.io', // 测试环境
  Production = 'https://sso.qiniu.com' // 线上环境
}

export const portalHost = isDev ? portalHosts.Staging : portalHosts.Production

export const ssoHost = isDev ? ssoHosts.Staging : ssoHosts.Production
