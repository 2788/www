/**
 * @file          price
 * @description   产品价格相关接口
 * @author        renpanpan
 */

import moment from 'moment'
import { injectable } from 'qn-fe-core/di'
import { UserInfoStore } from 'admin-base/user/account'
import { BaseClient } from 'admin-base/common/apis/base'

import { apiMongo } from 'constants/api-prefix'

export interface IPrice {
  product: string // 所在产品页,一个产品页只能有一个价格页，唯一性 key
  fileName: string // 文件名称
  fileUrl: string // 文件内容 url
  creator: string // 创建者
  modifier: string // 更改者
  createdAt: number // 创建时间，精确到秒
  updatedAt: number // 更新时间，精确到秒
}

export interface IAddPriceOptions {
  product: string
  fileName: string
  fileUrl: string
}

export interface IUpdatePriceOptions extends IAddPriceOptions {
  creator: string
  createdAt: number
}

export interface IListResponse {
  count: number
  data: IPrice[]
}

export interface IVersion {
  product: string
  fileName: string
  fileUrl: string
  creator: string
  createdAt: number // 创建时间，精确到秒
}

export interface IVersionWithId extends IVersion {
  _id: string
}

export interface IAddVersionOptions {
  product: string
  fileName: string
  fileUrl: string
}

@injectable()
export default class PriceApis {

  constructor(
    private client: BaseClient,
    private userInfoStore: UserInfoStore
  ) { }

  add(options: IAddPriceOptions): Promise<void> {
    const opts = {
      ...options,
      creator: this.userInfoStore.name,
      modifier: this.userInfoStore.name,
      createdAt: moment().unix(),
      updatedAt: moment().unix()
    }
    return this.client.post(apiMongo + '/www-product-price', opts)
  }

  update(options: IUpdatePriceOptions): Promise<void> {
    const opts = { ...options, modifier: this.userInfoStore.name, updatedAt: moment().unix() }
    return this.client.put(apiMongo + '/www-product-price/' + options.product, opts)
  }

  delete(id: string): Promise<void> {
    return this.client.delete(apiMongo + '/www-product-price/' + id)
  }

  list(): Promise<IListResponse> {
    return this.client.get<IListResponse>(apiMongo + '/www-product-price')
      .then(res => (res.data ? res : { ...res, data: [] }))
  }

  addVersion(options: IAddVersionOptions): Promise<void> {
    const opts = { ...options, creator: this.userInfoStore.name, createdAt: moment().unix() }
    return this.client.post(apiMongo + '/www-product-price-version', opts)
  }

  // 获取某个产品价格页下所有的历史记录
  getVersionsByProduct(product: string): Promise<IVersionWithId[]> {
    const options = { query: JSON.stringify({ product }), sort: '-createdAt' }
    return this.client.get<any>(apiMongo + '/www-product-price-version', options)
      .then(res => res.data || [])
  }

  // 删除某个产品价格页下所有的历史记录
  async deleteVersionsByProduct(product: string): Promise<void> {
    const versions = await this.getVersionsByProduct(product)
    await Promise.all(versions.map(version => (
      this.client.delete(apiMongo + '/www-product-price-version/' + version._id)
    )))
  }
}
