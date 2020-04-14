/**
 * @file All Activity apis
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import FetchStore from 'stores/fetch'

import { ValueOf } from 'types/ts'

import { proxyLego } from 'constants/proxy'
import { campaignTypeStrMap } from 'constants/campaign-type'
import { bannerLocationStrMap } from 'constants/banner'

export interface IListActivityNavOptions {
  campaign_type: string
  page: number
  page_size: number
}

export interface INavItemInfo {
  id: string
  campaign_type: ValueOf<typeof campaignTypeStrMap>
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

export interface IListActivityBannerOptions {
  location: string
  page: number
  page_size: number
}

export interface IListActivityBannerInfo {
  id: string
  location: ValueOf<typeof bannerLocationStrMap>
  title: string
  image_src: string
  link: string
  effect_at: string
  dead_at: string
}

export interface IListActivityBannerResult {
  banners: IListActivityBannerInfo[]
  count: string
}

@injectable()
export default class AllActivityApis extends Store {
  constructor(
    private fetchStore: FetchStore
  ) {
    super()
  }

  fetchNavList(options: IListActivityNavOptions): Promise<IListActivityNavResult> {
    return this.fetchStore.get(`${proxyLego}/campaigns/navs-online`, options)
  }

  fetchBannerList(options: IListActivityBannerOptions): Promise<IListActivityBannerResult> {
    return this.fetchStore.get(`${proxyLego}/banners-online`, options)
  }
}
