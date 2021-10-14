/**
 * @file 产品相关 admin 接口
 */

import { get } from 'utils/fetch'
import { ignoreProductPriceError } from 'constants/env'
import { Product } from 'constants/products'
import { NewsType } from 'constants/products/news'
import { mongoApiPrefix, getFilteredList, handleResponseData } from '.'

export interface INotice {
  product: string
  summary: string
  link: string
  type: string
  effectTime: number
  invalidTime: number
  createTime: number
  editTime: number
}

// 获取产品公告信息
export function getNotices(product: Product): Promise<INotice[]> {
  const options = { query: JSON.stringify({ product }) }
  return get(mongoApiPrefix + '/www-product-notice', options)
    .then(res => getFilteredList(handleResponseData(res)))
}

export interface IPage {
  id: string
  name: string
  link: string
}

// 获取产品页面信息
export function getPages(): Promise<IPage[]> {
  return get(mongoApiPrefix + '/www-product-page')
    .then(res => handleResponseData(res))
}

export interface INews {
  _id: string // 唯一标识（mongo ObjectID），由 mongo-api 自动生成
  product: string // 所在产品页
  type: NewsType // 动态类型
  title: string  // 标题
  desc: string  // 描述
  releaseTime: number  // 发布时间
  link: string // 详情链接
  createTime: number // 创建时间
  editTime: number // 更新时间
}

export interface INewsResponse {
  count: number
  data: INews[]
}

export interface INewsOptions {
  limit?: number
  offset?: number
  product?: string
  type?: NewsType
}

// 获取产品动态信息
export async function getNews({ limit = 4, offset = 0, product, type }: INewsOptions): Promise<INewsResponse> {
  const queryOpt = product === undefined && type === undefined
    ? {}
    : {
      query: JSON.stringify({ product, type })
    }
  const options = { ...queryOpt, limit, offset, sort: '-releaseTime' }
  const res = await get(mongoApiPrefix + '/www-product-news', options)
  return {
    count: res.count || 0,
    data: handleResponseData(res)
  }
}

export interface IPrice {
  product: string // 所在产品页,一个产品页只能有一个价格页，唯一性 key
  fileName: string // 文件名称
  fileUrl: string // 文件内容 url
  creator: string // 创建者
  modifier: string // 更改者
  createdAt: number // 创建时间，精确到秒
  updatedAt: number // 更新时间，精确到秒
}

// 获取产品价格页内容，先获取文件地址，再根据地址获取内容
export async function getPriceFileContent(product: Product): Promise<string> {
  try {
    const price: IPrice = await get(mongoApiPrefix + '/www-product-price/' + product)
    const text: string = await fetch(price.fileUrl).then((r: Response) => r.text())
    return text
  } catch (e) {
    if (ignoreProductPriceError) {
      return '该产品未配置价格详情，可 @tangbingyan 配置'
    }
    throw e
  }
}
