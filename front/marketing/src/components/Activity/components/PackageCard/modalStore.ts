/**
 * @file local store of component Package Buy Modal
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { injectProps } from 'qn-fe-core/local-store'

import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import { ValueOf } from 'types/ts'
import { effectType } from 'constants/package'
import { packageProductType } from 'constants/package'

import PackageApis, {
  IBuyPackageOptions, IBuyOrderOptions,
  IBuyPackageResult, IBuyOrderResult
} from 'apis/package'

import { getEffetTimeStrByType } from 'utils/package'

import { IProps } from './Modal'

enum Loading {
  BuyPackage = 'buyPackage'
}

@injectable()
export default class ModalStore extends Store {
  constructor(
    toasterStore: ToasterStore,
    private packageApis: PackageApis,
    @injectProps() private props: IProps
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  Loading = Loading
  loadings = Loadings.collectFrom(this, this.Loading)

  @observable.ref effectType: ValueOf<typeof effectType> = effectType.UNKNOWN
  @observable.ref quantity: number = 1
  @observable.ref orderHash: string = ''
  @observable.ref isSuccessModalShow: boolean = false

  @action.bound buyPackageBtnClick(type: ValueOf<typeof effectType>) {
    this.updateEffectType(type)
    this.buyPackage()
  }

  @action.bound controlSuccessModalShow(isShow: boolean) {
    this.isSuccessModalShow = isShow
  }

  @action.bound updateEffectType(type: ValueOf<typeof effectType>) {
    this.effectType = type
  }

  @action getBuyPackageReqPromise() {
    const { code, product_type, item_id, duration } = this.props
    let options: IBuyPackageOptions | IBuyOrderOptions | null = null

    switch(product_type) {
      case packageProductType.BASIC_PRODUCT:
        options = {
          orders: [{
            product_id: parseInt(item_id),
            duration: parseInt(duration),
            quantity: this.quantity,
            property: JSON.stringify({
              effect_time: getEffetTimeStrByType(this.effectType)
            })
          }],
          memo: `trade from marketing ${code}`
        }
        return this.packageApis.buyOrder(options)
      case packageProductType.PACKAGE:
        options = {
          package_id: parseInt(item_id),
          quantity: this.quantity,
          effect_type: this.effectType,
          memo: `trade from marketing ${code}`
        }
        return this.packageApis.buyPackage(options)
      default:
        console.error('无效的商品下单请求')
        return null
    }
  }

  @action getOrderHashFromRes(res: IBuyPackageResult | IBuyOrderResult | any) {
    const { product_type } = this.props

    switch (product_type) {
      case packageProductType.BASIC_PRODUCT:
        const { order_hash } = res
        return order_hash || ''
      case packageProductType.PACKAGE:
        const { order_hashes } = res
        return order_hashes[0] || ''
      default:
        return ''
    }
  }

  @action.bound updateOrderHash(orderHash: string) {
    if (!orderHash) {
      return
    }

    this.orderHash = orderHash
  }

  @Loadings.handle(Loading.BuyPackage)
  @ToasterStore.handle(undefined, '商品下单失败')
  buyPackage() {
    const req = this.getBuyPackageReqPromise()

    if (!req) {
      return
    }

    req.then(action((res: IBuyPackageResult | IBuyOrderResult) => {
      const { control_show_func } = this.props
      control_show_func(false)
      this.updateOrderHash(this.getOrderHashFromRes(res))
      this.controlSuccessModalShow(true)
    }))
    return req
  }

  @action.bound updateQuantityValue(value: number) {
    if (!value) {
      return
    }

    this.quantity = value
  }

  init() {
    const { max_purchases = '1' } = this.props
    this.updateQuantityValue(parseInt(max_purchases))
  }
}
