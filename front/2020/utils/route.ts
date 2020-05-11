/**
 * @file 路由相关
 * @description 主要存放各种关键页面的路由信息
 */

import { urlFor } from '.'

export function urlForSearch(keyword?: string) {
  return urlFor('/search', keyword ? { keyword } : undefined)
}
