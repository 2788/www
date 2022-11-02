/**
 * @file 产品
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { IconId } from 'constants/icon'

import { ProductSection } from './page'
import { ProductComponentBannerProps } from './page/comp-banner'

/** 产品唯一 id，跟产品所在页面的路径一一对应 */
export type ProductId = string

/** 官网产品页 url 前缀 */
export const wwwProductPathPrefix = '/products/'

/** 产品描述 */
export interface ProductDesc {
  /** 长描述，用于产品页 banner、meta 标签 description 等 */
  detail: string
  /** 短描述 */
  brief: string
}

/** 产品图标 */
export interface ProductIcon {
  /** 线框（默认） */
  line: IconId
  /** 线框（小） */
  lineSmall: IconId
  /** 毛玻璃（默认） */
  glass: IconId
}

/** 产品信息 */
export interface ProductInfo {
  /** 产品页相对路径，全局唯一，同时用作产品 id */
  path: ProductId
  /** 产品名字，全局唯一 */
  name: string

  /** 产品页标题 */
  title: string
  /** 关键字列表、产品标签 */
  keywords: string[]
  /** 产品描述 */
  desc: ProductDesc

  /** 产品图标 */
  icon: ProductIcon

  /** 产品页 banner 配置 */
  banner: ProductComponentBannerProps | null
  /** 产品页组件列表配置 */
  sections: ProductSection[]
}
