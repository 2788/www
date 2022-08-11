/**
 * @file          news
 * @description   产品动态相关接口
 * @author        renpanpan
 */

import moment from 'moment'
import { injectable } from 'qn-fe-core/di'

import BaseClient, { RefreshOptions } from 'apis/base-client'
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

const refreshPathsOptions: RefreshOptions = { wwwRefresh: ['/products', '/product-news'] }

@injectable()
export default class NewsApis {

  constructor(private client: BaseClient) { }

  add(options: INews): Promise<void> {
    options = { ...options, ...{ createTime: moment().unix(), editTime: moment().unix() } }
    return this.client.post(apiMongo + '/www-product-news', options, refreshPathsOptions)
  }

  update(options: INews, id: string): Promise<void> {
    options = { ...options, editTime: moment().unix() }
    return this.client.put(apiMongo + '/www-product-news/' + id, options, refreshPathsOptions)
  }

  delete(id: string): Promise<void> {
    return this.client.delete(apiMongo + '/www-product-news/' + id, refreshPathsOptions)
  }

  list({ limit, offset, products = [], types = [] }: IListOptions): Promise<IListResponse> {
    const productParam = products.length > 0 ? { product: { $in: products } } : null
    const typeParam = types.length > 0 ? { type: { $in: types } } : null
    const query = products.length > 0 || types.length > 0
      ? { query: JSON.stringify({ ...productParam, ...typeParam }) }
      : null
    const options = { ...query, limit, offset, sort: '-releaseTime,-editTime,-startTime' }
    return this.client.get<IListResponse>(apiMongo + '/www-product-news', options)
      .then(res => (res.data ? res : { ...res, data: [] }))
  }
}
