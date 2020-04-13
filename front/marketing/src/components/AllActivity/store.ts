/**
 * @file local store of All Activity
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'

import { ValueOf } from 'types/ts'

import { campaignTypeMap } from 'constants/campaign-type'
import { bannerLocationMap } from 'constants/banner'

import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import AllActivityApis, {
  IListActivityNavOptions,
  IListActivityNavResult,
  IActivityNavInfo,
  IListActivityBannerOptions,
  IListActivityBannerResult,
  IListActivityBannerInfo
} from 'apis/all-activity'

enum Loading {
  FetchNavList = 'fetchNavList',
  FetchBannerList = 'fetchBannerList'
}

@injectable()
export default class AllActivityStore extends Store {
  constructor(
    toasterStore: ToasterStore,
    private allActivityApis: AllActivityApis
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  Loading = Loading
  loadings = Loadings.collectFrom(this, this.Loading)

  @observable.ref campaignType: ValueOf<typeof campaignTypeMap> | string = campaignTypeMap.UNKNOWN
  @observable.deep activityNavList: IActivityNavInfo[] = []
  @observable.deep activityBannerList: IListActivityBannerInfo[] = []

  @action.bound updateCampaignType(type: string) {
    if (!type) {
      return
    }

    this.campaignType = type
    this.fetchNavList()
  }

  @action.bound updateActivityNavList(list: IActivityNavInfo[]) {
    this.activityNavList = list
  }

  @action.bound updateActivityBannerList(list: IListActivityBannerInfo[]) {
    this.activityBannerList = list
  }

  @Loadings.handle(Loading.FetchNavList)
  @ToasterStore.handle(undefined, '获取聚合页导航数据失败')
  fetchNavList() {
    const options: IListActivityNavOptions = {
      campaign_type: this.campaignType,
      page: 1,
      page_size: 100
    }
    const req = this.allActivityApis.fetchNavList(options)
    req.then((res: IListActivityNavResult) => {
      const { items = [] } = res
      this.updateActivityNavList(items)
    }, (_err) => {
      this.updateActivityNavList([])
    })
    return req
  }

  @Loadings.handle(Loading.FetchBannerList)
  @ToasterStore.handle(undefined, '获取聚合页 Banner 数据失败')
  fetchBannerList() {
    const options: IListActivityBannerOptions = {
      location: bannerLocationMap.MARKETING,
      page: 1,
      page_size: 100
    }
    const req = this.allActivityApis.fetchBannerList(options)
    req.then((res: IListActivityBannerResult) => {
      const { banners = [] } = res
      this.updateActivityBannerList(banners)
    }, (_err) => {
      this.updateActivityBannerList([])
    })
    return req
  }

  init() {
    this.fetchNavList()
    this.fetchBannerList()
  }
}
