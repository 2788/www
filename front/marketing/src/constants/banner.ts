/**
 * @file constants of banner
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

export const bannerLocationMap = {
  UNKNOWN: '0', // 未知
  WWW: '1', // 官网首页
  MARKETING: '100', // 活动聚合页
  PORTAL: '200' // 控制台首页
} as const

export const bannerLocationStrMap = {
  UNKNOWN: 'BANNER_LOCATION_UNKNOWN', // 未知
  WWW: 'BANNER_LOCATION_WWW', // 官网首页
  MARKETING: 'BANNER_LOCATION_MARKETING', // 活动聚合页
  PORTAL: 'BANNER_LOCATION_PORTAL' // 控制台首页
} as const
