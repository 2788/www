/**
 * @file 产品公告
 */

import { get } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'
import { Product } from 'constants/products'

const apiPrefix = `${basePrefix}/www-admin/api/mongo`

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

// 过滤数据，获取上架中的数据
function getFilteredList(list: INotice[]) {
  const nowTime = Math.floor(new Date().getTime() / 1000) // 取秒数
  const filteredList = list.filter(item => item.effectTime <= nowTime && item.invalidTime >= nowTime)
  return filteredList
}
