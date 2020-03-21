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

import PackageApis, { IBuyPackageOptions } from 'apis/package'

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

  @observable.ref quantity: number = 1

  @action.bound buyPackageBtnClick(effect: ValueOf<typeof effectType>) {
    const { item_id } = this.props
    const options: IBuyPackageOptions = {
      item_id: parseInt(item_id),
      quantity: this.quantity,
      effect_type: effect
    }

    this.buyPackage(options)
  }

  @Loadings.handle(Loading.BuyPackage)
  @ToasterStore.handle('商品下单成功', '商品下单失败')
  buyPackage(options: IBuyPackageOptions) {
    const req = this.packageApis.buyPackage(options)
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
