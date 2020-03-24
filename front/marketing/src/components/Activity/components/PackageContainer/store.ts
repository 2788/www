/**
 * @file local store of component PackageContainer
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { injectProps } from 'qn-fe-core/local-store'

import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import PackageApis, { IListPackagesOptions, IPackageInfo } from 'apis/package'

import { IProps } from '.'

enum Loading {
  FetchList = 'fetchList'
}

@injectable()
export default class PackageContainerStore extends Store {
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

  @observable.ref packageList: IPackageInfo[] = []

  @action.bound updatePackageList(list: IPackageInfo[]) {
    this.packageList = list
  }

  @Loadings.handle(Loading.FetchList)
  @ToasterStore.handle(undefined, '获取商品信息失败')
  fetchList() {
    const { code, info: { key, data: { group } } } = this.props
    const options: IListPackagesOptions = {
      campaign_code: code,
      group: group,
      group_key: key,
      page: 1,
      page_size: 100
    }
    const req = this.packageApis.fetchList(options)
    req.then(res => {
      const { campaign_product_detail = [] } = res
      this.updatePackageList(campaign_product_detail)
    })
    return req
  }

  init() {
    this.fetchList()
  }
}
