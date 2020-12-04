/**
 * @file 产品公告
 */

import { get } from 'utils/fetch'
import { Product } from 'constants/products'
import { apiPrefix, getFilteredList } from '.'

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
  return get(apiPrefix + '/www-product-notice', options).then(data => (data && data.length ? getFilteredList(data) : []))
}
