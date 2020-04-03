/**
 * @file package's apis
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import FetchStore from 'stores/fetch'

import { ValueOf } from 'types/ts'
import { packageProductType, effectType } from 'constants/package'
import { proxyLego, proxyGaea } from 'constants/proxy'

export interface IListPackagesOptions {
  campaign_code: string // activity code
  group: string
  group_key: string
  page: number
  page_size: number
}

export interface IPackageProperty {
  key: string
  value: string
}

export interface IPackageDimension {
  key: string
  value: string
}

export interface IPackageItem {
  item_id: string
  dimension_value: string
  c_fee: string
  fee: string
  url: string
  max_purchases: string
  duration: string
}

export interface IPackageInfo {
  id: string // 记录在数据库中的 id
  campaign_id: string
  group: string
  group_key: string
  seq: string
  product_type: ValueOf<typeof packageProductType>
  properties: IPackageProperty[]
  dimensions: IPackageDimension[]
  items: IPackageItem[]
  appear_fee: boolean
  title: string
  subtitle: string
  subscript_name: string
  subscript_text: string
  subscript_color: string
  label: string
  label_color: string
}

export interface IListPackagesResult {
  campaign_product_detail: IPackageInfo[]
}

export interface IBuyPackageOptions {
  package_id: number
  quantity: number
  effect_type: ValueOf<typeof effectType>
  memo?: string
}

export interface IBuyPackageResult {
  order_hash: string
  order_hashes: string[]
}

export interface IOrderItem {
  product_id: number
  duration: number
  quantity: number
  property: string
}

export interface IBuyOrderOptions {
  orders: IOrderItem[]
  memo?: string
}

export interface IBuyOrderResult {
  order_hash: string
}

@injectable()
export default class PackageApis extends Store {
  constructor(
    private fetchStore: FetchStore
  ) {
    super()
  }

  fetchList(options: IListPackagesOptions): Promise<IListPackagesResult> {
    return this.fetchStore.get(`${proxyLego}/marketing/products`, options)
  }

  buyPackage(options: IBuyPackageOptions): Promise<IBuyPackageResult> {
    return this.fetchStore.postJSON(`${proxyGaea}/api/package/buy`, options)
  }

  buyOrder(options: IBuyOrderOptions): Promise<IBuyOrderResult> {
    return this.fetchStore.postJSON(`${proxyGaea}/api/order/new`, options)
  }
}
