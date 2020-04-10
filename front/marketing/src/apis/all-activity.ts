/**
 * @file All Activity apis
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import FetchStore from 'stores/fetch'

import { ValueOf } from 'types/ts'

import { proxyLego } from 'constants/proxy'
import { campaignTypeMap } from 'constants/campaign-type'

export interface IListActivityNavOptions {
  campaign_type: string
  page: number
  page_size: number
}

export interface INavItemInfo {
  id: string
  campaign_type: ValueOf<typeof campaignTypeMap>
  title: string
  subtitle: string
  seq: string
  background_image: string
  button_text: string
  url: string
  effect_at: string
  dead_at: string
}

export interface ISubscriptInfo {
  text: string
  name: string
  color: string
}

export interface IActivityNavInfo {
  nav_item: INavItemInfo
  subscript: ISubscriptInfo
}

export interface IListActivityNavResult {
  items: IActivityNavInfo[]
  count: string
}

@injectable()
export default class AllActivityApis extends Store {
  constructor(
    private fetchStore: FetchStore
  ) {
    super()
  }

  fetchList(options: IListActivityNavOptions): Promise<IListActivityNavResult> {
    return this.fetchStore.get(`${proxyLego}/campaigns/navs`, options)
  }
}
