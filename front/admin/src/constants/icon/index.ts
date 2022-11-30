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
  // TODO: 如果未来体积太大需要优化，考虑用新 mongo api 的裁剪能力，或把文件内容外置于 CDN （可参考价格页）
  //       （外置需要解决跨域等问题，以及可能带来更高的使用侧复杂度 & 新的性能问题）
  content: string
}

export type IconFile = UrlIcon | SvgInlineIcon

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

export type IconInfo = IconBaseInfo & IconFile

export const iconConfig = {
  width: 96, // 推荐尺寸
  height: 96, // 推荐尺寸
  maxSize: 100
}
