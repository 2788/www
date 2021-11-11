/**
 * @file          banner
 * @description   全局公告相关接口
 * @author        renpanpan
 */

import moment from 'moment'
import { injectable } from 'qn-fe-core/di'
import FetchStore from 'stores/fetch'
import { apiMongo } from 'constants/api-prefix'

// 展示区域
export enum DisplayPages {
  WwwHomepage = 'www-homepage', // 官网首页
  WwwOthers = 'www-others' // 官网其他页面
}

export interface IBannerWithId {
  _id: string
  name: string // 公告名称
  pcImg: string
  mobileImg: string
  effectTime: number // 生效时间，精确到秒
  invalidTime: number // 失效时间，精确到秒
  createTime: number // 创建时间，精确到秒
  editTime: number // 更新时间，精确到秒
  backgroundColor: string // pc 端背景色
  link: string // 跳转链接
  displayPages: DisplayPages[] // 展示区域
}

export interface IAddBannerOptions {
  name: string
  pcImg: string
  mobileImg: string
  effectTime: number
  invalidTime: number
  backgroundColor: string
  link: string
  displayPages: DisplayPages[]
}

export interface IUpdateBannerOptions extends IAddBannerOptions {
  createTime: number
}

export interface IListResponse {
  count: number
  data: IBannerWithId[]
}

@injectable()
export default class BannerApis {

  constructor(
    private fetchStore: FetchStore
  ) { }

  add(options: IAddBannerOptions): Promise<void> {
    const opts = { ...options, createTime: moment().unix(), editTime: moment().unix() }
    return this.fetchStore.postJSON(apiMongo + '/www-global-banner', opts)
  }

  update(id: string, options: IUpdateBannerOptions): Promise<void> {
    const opts = { ...options, editTime: moment().unix() }
    return this.fetchStore.putJSON(apiMongo + '/www-global-banner/' + id, opts)
  }

  delete(id: string): Promise<void> {
    return this.fetchStore.delete(apiMongo + '/www-global-banner/' + id)
  }

  list(): Promise<IListResponse> {
    return this.fetchStore.get(
      apiMongo + '/www-global-banner', { sort: '-editTime' }
    ).then(res => (res.data ? res : { ...res, data: [] }))
  }
}
