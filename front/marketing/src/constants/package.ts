/**
 * @file constants of package
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

export const packageProductType = {
  UNKNOWN: 'CAMPAIGN_PRODUCT_TYPE_UNKNOWN', // 未知
  BASIC_PRODUCT: 'CAMPAIGN_PRODUCT_TYPE_PRODUCT', // 基础商品
  PACKAGE: 'CAMPAIGN_PRODUCT_TYPE_PACKAGE', // 套餐包
  LINK: 'CAMPAIGN_PRODUCT_TYPE_LINK' // 自定义链接
} as const

export const effectType = {
  UNKNOWN: 0, // 未知
  AT_ONCE: 1, // 立即生效
  NEXT_MONTH: 2, // 下月生效
  CURRENT_MONTH: 3 // 当月生效
} as const
