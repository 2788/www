/**
 * @file local store of component PackageCard
 * @author jiayzihen <jiayzihen@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { injectProps } from 'qn-fe-core/local-store'

import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import PackageApis, {
  IBuyPackageOptions, IPackageItem,
  IPackageDimension
} from 'apis/package'

import { splitStrByDot, joinStrListByHyphen } from 'utils/package'

import { IProps, IDimensionDropdownItem } from '.'

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

  @observable.ref selectedPackage: IPackageItem | undefined
  @observable.deep dimensionDropdownList: IDimensionDropdownItem[] = []

  @action.bound updateDimensionDropdownList(list: IPackageDimension[]) {
    if (!list || !list.length) {
      return
    }

    const dimensionDropdownList: IDimensionDropdownItem[] = []
    list.forEach((item: IPackageDimension, _index: number) => {
      const { key, value } = item
      const valueSplitList: string[] = splitStrByDot(value)
      const dimensionDropdownItem: IDimensionDropdownItem = {
        label: key,
        list: valueSplitList,
        value: valueSplitList[0] || ''
      }
      dimensionDropdownList.push(dimensionDropdownItem)
    })
    this.dimensionDropdownList = dimensionDropdownList
    this.updateSelectedPackage(dimensionDropdownList)
  }

  @action.bound updateSelectedPackage(list: IDimensionDropdownItem[]) {
    if (!list || !list.length) {
      return
    }

    const dimensionDropdownValueList: string[] = list.map((item: IDimensionDropdownItem, _index: number) => {
      const { value = '' } = item
      return value
    })

    const dimensionValue: string = joinStrListByHyphen(dimensionDropdownValueList)
    const { items } = this.props
    this.selectedPackage = items.find((item: IPackageItem, _index: number) => {
      return item.dimension_value === dimensionValue
    })
  }

  @action.bound setDimensionDropdownValue(value: string, index: number) {
    this.dimensionDropdownList[index].value = value
    this.updateSelectedPackage(this.dimensionDropdownList)
  }

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

  init() {
    this.updateDimensionDropdownList(this.props.dimensions)
  }
}
