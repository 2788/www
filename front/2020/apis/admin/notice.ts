/**
 * @file 产品公告
 */

import { get } from 'utils/fetch'
import { Product } from 'constants/products'
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
