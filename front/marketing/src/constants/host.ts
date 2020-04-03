/**
 * @file constants of host
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { isDev } from './env'

enum portalHosts {
  Development = 'http://portalv4.dev.qiniu.io', // 测试环境
  Production = 'https://portal.qiniu.com' // 线上环境
}

enum ssoHosts {
  Development = 'https://sso-dev.qiniu.io', // 测试环境
  Production = 'https://sso.qiniu.com' // 线上环境
}

export const portalHost = isDev ? portalHosts.Development : portalHosts.Production

export const ssoHost = isDev ? ssoHosts.Development : ssoHosts.Production
