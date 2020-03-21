/**
 * @file local store of component CouponCard
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { injectProps } from 'qn-fe-core/local-store'

import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import CouponApis, { IDrawCouponOptions } from 'apis/coupon'

import { IProps } from '.'

enum Loading {
  DrawCoupon = 'drawCoupon'
}

@injectable()
export default class CouponCardStore extends Store {
  constructor(
    toasterStore: ToasterStore,
    private couponApis: CouponApis,
    @injectProps() private props: IProps,
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  Loading = Loading
  loadings = Loadings.collectFrom(this, this.Loading)

  @action.bound drawCouponBtnClick() {
    this.drawCoupon()
  }

  @Loadings.handle(Loading.DrawCoupon)
  @ToasterStore.handle('领取抵用券成功', '领取抵用券失败')
  drawCoupon() {
    const options: IDrawCouponOptions = {
      batch_id: parseInt(this.props.batch_id)
    }
    const req = this.couponApis.drawCounpon(options)
    return req
  }
}
