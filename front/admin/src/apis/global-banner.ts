/**
 * @file          banner
 * @description   全局公告相关接口
 * @author        renpanpan
 */

import moment from 'moment'
import { injectable } from 'qn-fe-core/di'

import BaseClient, { RefreshOptions } from 'apis/base-client'
import { wwwPaths } from 'constants/deploy/refresh'
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

const refreshPathsOptions: RefreshOptions = { wwwRefresh: [...wwwPaths] }

@injectable()
export default class BannerApis {

  constructor(
    private client: BaseClient
  ) { }

  add(options: IAddBannerOptions): Promise<void> {
    const opts = { ...options, createTime: moment().unix(), editTime: moment().unix() }
    return this.client.post(apiMongo + '/www-global-banner', opts, refreshPathsOptions)
  }

  update(id: string, options: IUpdateBannerOptions): Promise<void> {
    const opts = { ...options, editTime: moment().unix() }
    return this.client.put(apiMongo + '/www-global-banner/' + id, opts, refreshPathsOptions)
  }

  delete(id: string): Promise<void> {
    return this.client.delete(apiMongo + '/www-global-banner/' + id, refreshPathsOptions)
  }

  list(): Promise<IListResponse> {
    return this.client.get<IListResponse>(
      apiMongo + '/www-global-banner', { sort: '-editTime' }
    ).then(res => (res.data ? res : { ...res, data: [] }))
  }
}
