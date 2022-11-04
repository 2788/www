/**
 * @file 图标库
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export type IconId = string

export const iconScheme = 'icon://'

export interface UrlIcon {
  type: 'url'
  /** icon 地址 */
  url: string
}

export interface SvgInlineIcon {
  type: 'svg-inline'
  /** svg 源码 */
  content: string // TODO: 未来体积太大还可能要进一步优化…
}

type IconTypes = UrlIcon | SvgInlineIcon

interface IconBaseInfo {
  /** 全局唯一英文名 */
  id: IconId
  /** 全局唯一中文名 */
  name: string
  /** 宽度 */
  width?: number
  /** 高度 */
  height?: number
}

export type IconInfo = IconBaseInfo & IconTypes

export const iconConfig = {
  width: 96, // 推荐尺寸
  height: 96, // 推荐尺寸
  maxSize: 100
}
