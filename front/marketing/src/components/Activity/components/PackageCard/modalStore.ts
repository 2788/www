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
import SensorsApis from 'apis/sensors'

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
    private sensorsApis: SensorsApis,
    @injectProps() private props: IProps
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  Loading = Loading
  loadings = Loadings.collectFrom(this, this.Loading)

  @observable.ref effect: ValueOf<typeof effectType> = effectType.CURRENT_MONTH
  @observable.ref quantity: number = 1
  @observable.ref orderHash: string = ''
  @observable.ref isSuccessModalShow: boolean = false

  @action.bound buyPackageBtnClick() {
    this.buyPackage()
  }

  @action.bound controlSuccessModalShow(isShow: boolean) {
    this.isSuccessModalShow = isShow
  }

  @action.bound updateEffectType(effect: ValueOf<typeof effectType>) {
    if (!effect) {
      return
    }

    this.effect = effect
  }

  @action getBuyPackageReqOptions() {
    const { code, product_type, item_id, duration } = this.props
    let options: IBuyPackageOptions | IBuyOrderOptions | any = null

    switch (product_type) {
      case packageProductType.BASIC_PRODUCT:
        options = {
          orders: [{
            product_id: parseInt(item_id),
            duration: parseInt(duration),
            quantity: this.quantity,
            property: JSON.stringify({
              effect_time: getEffetTimeStrByType(this.effect)
            })
          }],
          memo: `trade from marketing ${code}`
        }
        break
      case packageProductType.PACKAGE:
        options = {
          package_id: parseInt(item_id),
          quantity: this.quantity,
          effect_type: this.effect,
          memo: `trade from marketing ${code}`
        }
        break
      default:
        console.error('无效的商品下单参数')
    }

    return options
  }

  @action getBuyPackageReqPromise(options: IBuyPackageOptions | IBuyOrderOptions | any) {
    const { product_type } = this.props

    switch (product_type) {
      case packageProductType.BASIC_PRODUCT:
        return this.packageApis.buyOrder(options)
      case packageProductType.PACKAGE:
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
  @ToasterStore.handle()
  buyPackage() {
    const { product_type } = this.props
    const options = this.getBuyPackageReqOptions()
    const req = this.getBuyPackageReqPromise(options)

    if (!req) {
      return
    }

    req.then(action((res: IBuyPackageResult | IBuyOrderResult) => {
      const { control_show_func } = this.props
      control_show_func(false)
      this.updateOrderHash(this.getOrderHashFromRes(res))
      this.controlSuccessModalShow(true)

      this.sensorsApis.track('BuyOrderOrPackage', {
        status: 'success',
        product_type,
        ...options
      })
    }), (err) => {
      const { detail: { code, message } } = err

      this.sensorsApis.track('BuyOrderOrPackage', {
        status: 'fail',
        product_type,
        err_code: code,
        err_message: message,
        ...options
      })
    })
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
