/**
 * @file local store of component PackageCard
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { injectProps } from 'qn-fe-core/local-store'

import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import { IPackageItem, IPackageDimension } from 'apis/package'

import { splitStrByComma, joinStrListByHyphen } from 'utils/package'

import { IProps, IDimensionDropdownItem } from '.'

enum Loading {}

@injectable()
export default class PackageCardStore extends Store {
  constructor(
    toasterStore: ToasterStore,
    @injectProps() private props: IProps,
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  Loading = Loading
  loadings = Loadings.collectFrom(this, this.Loading)

  @observable.ref selectedPackage: IPackageItem | undefined
  @observable.deep dimensionDropdownList: IDimensionDropdownItem[] = []
  @observable.ref isPackageModalShow: boolean = false
  @observable.ref isNeedSigninModalShow: boolean = false

  @action.bound updateDimensionDropdownList(list: IPackageDimension[]) {
    if (!list || !list.length) {
      return
    }

    const dimensionDropdownList: IDimensionDropdownItem[] = []
    list.forEach((item: IPackageDimension, _index: number) => {
      const { key, value } = item
      const valueSplitList: string[] = splitStrByComma(value)
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
      const { value } = item
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

  @action.bound controlPackageModalShow(isShow: boolean) {
    this.isPackageModalShow = isShow
  }

  @action.bound controlNeedSigninModalShow(isShow: boolean) {
    this.isNeedSigninModalShow = isShow
  }

  init() {
    this.updateDimensionDropdownList(this.props.dimensions)
  }
}
