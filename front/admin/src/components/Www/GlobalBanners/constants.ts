/**
 * @file          constants
 * @description   全局公告相关常量
 * @author        renpanpan
 */

import { DisplayPages } from 'apis/global-banner'

// 展示区域 text map
export const displayPagesTextMap = {
  [DisplayPages.WwwHomepage]: '官网首页',
  [DisplayPages.WwwOthers]: '官网其他页面'
} as const

// 展示区域数组，方便按照指定顺序显示
export const displayPagesArr = [
  DisplayPages.WwwHomepage, DisplayPages.WwwOthers
] as const
