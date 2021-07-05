/**
 * @file          news
 * @description   产品动态常量定义
 * @author        renpanpan
 */

// 动态类型
export enum NewsType {
  NewProduct,
  NewFeature,
  NewRegion,
  ExperienceBetter
}

export const nameMap = {
  [NewsType.NewProduct]: '新产品',
  [NewsType.NewFeature]: '新功能',
  [NewsType.NewRegion]: '新区域',
  [NewsType.ExperienceBetter]: '体验优化'
} as const

export const newsTypeArr = [NewsType.NewProduct, NewsType.NewFeature, NewsType.NewRegion, NewsType.ExperienceBetter]
