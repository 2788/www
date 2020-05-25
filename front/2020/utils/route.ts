/**
 * @file 路由相关
 * @description 主要存放各种关键页面的路由信息
 */

import { Product } from 'constants/products'
import { urlFor } from '.'

export function urlForSearch(keyword?: string) {
  return urlFor('/search', keyword ? { keyword } : undefined)
}

export type QvmBuyOptions = {
  mode?: 'DirectOrder' // 指定 DirectOrder 时，直接进入订单提交模式，一般用于活动订单
  region_id?: string // 地域，参考 https://qvm.qiniu.io/v1/open/region
  image_id?: string // 镜像
  instance_type?: string // 机型
  eip?: number // 公网带宽大小
  buymonth?: number // 购买月份数
  activity?: string // 活动 ID，特定活动时指定，用于弹框提示活动细则，新活动已经不使用该参数，统一使用 discount
  discount?: string // 折扣 ID，特定折扣时指定，用于提示
}

export function urlForQvmBuy(options?: QvmBuyOptions) {
  return urlFor(
    'https://portal.qiniu.com/qvm/vm/instance/create',
    options
  )
}

export function urlForPrice(product: Product) {
  return `/prices/${product}`
}
