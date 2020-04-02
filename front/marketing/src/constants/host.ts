/**
 * @file constants of host
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { isDev } from './env'

enum portalHosts {
  Development = 'http://portalv4.dev.qiniu.io', // 测试环境
  // Production = 'https://portal.qiniu.com' // 线上环境
  Production = 'http://portalv4.dev.qiniu.io' // TODO 这边为了方便 spock 测试改成了测试环境的地址
}

enum ssoHosts {
  Development = 'https://sso-dev.qiniu.io', // 测试环境
  // Production = 'https://sso.qiniu.com' // 线上环境
  Production = 'https://sso-dev.qiniu.io' // TODO 这边为了方便 spock 测试改成了测试环境的地址
}

export const portalHost = isDev ? portalHosts.Development : portalHosts.Production

export const ssoHost = isDev ? ssoHosts.Development : ssoHosts.Production
