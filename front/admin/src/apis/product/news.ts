/**
 * @file          news
 * @description   产品动态相关接口
 * @author        renpanpan
 */

import moment from 'moment'
import { injectable } from 'qn-fe-core/di'
import FetchStore from 'stores/fetch'
import { apiMongo } from 'constants/api-prefix'

// 动态类型
export enum NewsType {
  NewProduct,
  NewFeature,
  NewRegion,
  ExperienceBetter
}

export interface INews {
  product: string
  type: NewsType
  title: string
  desc: string
  releaseTime: number
  link: string
  createTime: number
  editTime: number
}

export interface INewsWithId extends INews {
  _id: string
}

export interface IListOptions {
  limit: number
  offset: number
  products?: string[]
  types?: NewsType[]
}

export interface IListResponse {
  count: number
  data: INewsWithId[]
}

@injectable()
export default class NewsApis {

  constructor(private fetchStore: FetchStore) { }

  add(options: INews): Promise<void> {
    options = { ...options, ...{ createTime: moment().unix(), editTime: moment().unix() } }
    return this.fetchStore.postJSON(apiMongo + '/www-product-news', options)
  }

  update(options: INews, id: string): Promise<void> {
    options = { ...options, editTime: moment().unix() }
    return this.fetchStore.putJSON(apiMongo + '/www-product-news/' + id, options)
  }

  delete(id: string): Promise<void> {
    return this.fetchStore.delete(apiMongo + '/www-product-news/' + id)
  }

  list({ limit, offset, products = [], types = [] }: IListOptions): Promise<IListResponse> {
    const productParam = products.length > 0 ? { product: { $in: products } } : null
    const typeParam = types.length > 0 ? { type: { $in: types } } : null
    const query = products.length > 0 || types.length > 0
      ? { query: JSON.stringify({ ...productParam, ...typeParam }) }
      : null
    const options = { ...query, limit, offset, sort: '-releaseTime,-editTime,-startTime' }
    return this.fetchStore.get(apiMongo + '/www-product-news', options)
      .then(res => (res.data ? res : { ...res, data: [] }))
  }
}
