/**
 * @file coupon's apis
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import FetchStore from 'stores/fetch'

import { ValueOf } from 'types/ts'
import { couponTimePeriodType } from 'constants/coupon'
import { proxyLego, proxyGaea } from 'constants/proxy'

export interface IListCouponsOptions {
  campaign_code: string // activity code
  group: string
  group_key: string
  page: number
  page_size: number
}

export interface ICouponInfo {
  id: string // 记录在数据库中的 id
  campaign_id: string
  group: string
  group_key: string
  seq: string
  batch_id: string // 对应的抵用券 id
  rule_text: string
  subscript_name: string
  subscript_text: string
  subscript_color: string
  coupon_name: string
  coupon_money: string
  threshold_money: string
  effect_days: string
  coupon_effect_time: string
  coupon_dead_time: string
  coupon_scope_desc: string
  time_period_type: ValueOf<typeof couponTimePeriodType>
  label: string
  label_color: string
}

export interface IListCouponsResult {
  campaign_coupon_detail: ICouponInfo[]
}

export interface IDrawCouponOptions {
  batch_id: number
}

export interface IDrawCouponResult {}

@injectable()
export default class CouponApis extends Store {
  constructor(
    private fetchStore: FetchStore
  ) {
    super()
  }

  fetchList(options: IListCouponsOptions): Promise<IListCouponsResult> {
    return this.fetchStore.get(`${proxyLego}/marketing/coupons`, options)
  }

  drawCounpon(options: IDrawCouponOptions): Promise<IDrawCouponResult> {
    return this.fetchStore.postJSON(`${proxyGaea}/api/marketing/event/coupon/bind`, options)
  }
}
