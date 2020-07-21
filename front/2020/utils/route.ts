/**
 * @file 路由相关
 * @description 主要存放各种关键页面的路由信息
 */

import { Product } from 'constants/products'
import { ssoHost, ssoClientID } from 'constants/env'
import { urlFor } from '.'

export function urlForSearch(keyword?: string) {
  return urlFor('/search', keyword ? { keyword } : undefined)
}

export type QvmBuyOptions = {
  ui_mode?: 'submit' // 指定 UI mode？细节咨询 @颜景豪
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

export function urlForPrice(product: Product, calculator = false) {
  // TODO: 后续把这个信息也挪到 constants/products 里维护
  if (product === Product.Plsv) {
    return '/products/plsv#price'
  }
  const params = calculator ? { tab: 'calc' } : undefined
  return urlFor(`/prices/${product}`, params)
}

export function urlForSignin(redirectUrl: string) {
  return urlFor(ssoHost, {
    client_id: ssoClientID,
    redirect_url: redirectUrl
  })
}

export function urlForSignout(redirectUrl: string) {
  return urlFor(`${ssoHost}/signout`, {
    ref: redirectUrl
  })
}

export function checkInSite(href?: string) {
  if (!href) return { inSite: true, path: '' } as const

  const hasProtocolAndHost = /^[a-z]+:/.test(href) // href="foo://bar.com"
  const hasHostOnly = /\/\//.test(href) // href="//bar.com/..."

  if (hasProtocolAndHost || hasHostOnly) {
    // TODO: 后续可以考虑结合当前 host，进一步把 `https://www.qiniu.com/foo` 或
    // `//www.qiniu.com/foo` 转化为 /foo，并当成站内链接处理
    return { inSite: false } as const
  }

  return {
    inSite: true,
    path: href
  } as const
}
