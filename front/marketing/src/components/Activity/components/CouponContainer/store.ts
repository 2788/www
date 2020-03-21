/**
 * @file local store of component CouponContainer
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { injectProps } from 'qn-fe-core/local-store'

import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import CouponApis, { IListCouponsOptions, ICouponInfo } from 'apis/coupon'

import { IProps } from '.'

enum Loading {
  FetchList = 'fetchList'
}

@injectable()
export default class CouponContainerStore extends Store {
  constructor(
    toasterStore: ToasterStore,
    private couponApis: CouponApis,
    @injectProps() private props: IProps
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  Loading = Loading
  loadings = Loadings.collectFrom(this, this.Loading)

  @observable.ref couponList: ICouponInfo[] = []

  @action.bound updateCouponList(list: ICouponInfo[]) {
    this.couponList = list
  }

  @Loadings.handle(Loading.FetchList)
  @ToasterStore.handle(undefined, '获取抵用券信息失败')
  fetchList() {
    const { code, info: { key, data: { group } } } = this.props
    const options: IListCouponsOptions = {
      campaign_code: code,
      group: group,
      group_key: key,
      page: 1,
      page_size: 100
    }
    const req = this.couponApis.fetchList(options)
    req.then(res => {
      const { campaign_coupon_detail = [] } = res
      this.updateCouponList(campaign_coupon_detail)
    })
    return req
  }

  init() {
    this.fetchList()
  }
}
