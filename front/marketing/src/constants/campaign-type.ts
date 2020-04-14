/**
 * @file constants of campaign type
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

export const campaignTypeMap = {
  UNKNOWN: '0', // 未知（全部）
  PROMOTION: '1', // 特惠促销
  BEGINNER: '2', // 新手福利
  OTHER: '3' // 其他
} as const

export const campaignTypeStrMap = {
  UNKNOWN: 'CAMPAIGN_TYPE_UNKNOWN', // 未知（全部）
  PROMOTION: 'CAMPAIGN_TYPE_PROMOTION', // 特惠促销
  BEGINNER: 'CAMPAIGN_TYPE_BEGINNER', // 新手福利
  OTHER: 'CAMPAIGN_TYPE_OTHER' // 其他
} as const
