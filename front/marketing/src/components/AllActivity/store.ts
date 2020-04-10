/**
 * @file local store of All Activity
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'

import { ValueOf } from 'types/ts'

import { campaignTypeMap } from 'constants/campaign-type'

import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import AllActivityApis, {
  IListActivityNavOptions,
  IListActivityNavResult,
  IActivityNavInfo
} from 'apis/all-activity'

enum Loading {
  FetchList = 'fetchList'
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

  @action.bound updateCampaignType(type: string) {
    if (!type) {
      return
    }

    this.campaignType = type
    this.fetchList()
  }

  @action.bound updateActivityNavList(list: IActivityNavInfo[]) {
    this.activityNavList = list
  }

  @Loadings.handle(Loading.FetchList)
  @ToasterStore.handle(undefined, '获取活动聚合页面数据失败')
  fetchList() {
    const options: IListActivityNavOptions = {
      campaign_type: this.campaignType,
      page: 1,
      page_size: 100
    }
    const req = this.allActivityApis.fetchList(options)
    req.then((res: IListActivityNavResult) => {
      const { items = [] } = res
      this.updateActivityNavList(items)
    }, (_err) => {
      this.updateActivityNavList([])
    })
    return req
  }

  init() {
    this.fetchList()
  }
}
