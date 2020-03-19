/**
 * @file local store of component PackageCard
 * @author jiayzihen <jiayzihen@qiniu.com>
 */

import { action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { injectProps } from 'qn-fe-core/local-store'

import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import PackageApis, { IBuyPackageOptions } from 'apis/package'

import { IProps } from '.'

enum Loading {
  BuyPackage = 'buyPackage'
}

@injectable()
export default class PackageCardStore extends Store {
  constructor(
    toasterStore: ToasterStore,
    private packageApis: PackageApis,
    @injectProps() private props: IProps,
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  Loading = Loading
  loadings = Loadings.collectFrom(this, this.Loading)

  @Loadings.handle(Loading.BuyPackage)
  @ToasterStore.handle('领取抵用券成功', '领取抵用券失败')
  buyPackage() {
    const options: IBuyPackageOptions = {
      item_id: 1,
      quantity: 1,
      effect_type: 2
    }
    const req = this.packageApis.buyPackage(options)
    return req
  }
}
