/**
 * @file 图标库
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export type IconId = string

export const iconScheme = 'icon://'

export interface IconInfo {
  /** 全局唯一英文名 */
  id: IconId
  /** 全局唯一中文名 */
  name: string
  /** icon 地址 */
  url: string
  /** 宽度 */
  width?: number
  /** 高度 */
  height?: number
}
