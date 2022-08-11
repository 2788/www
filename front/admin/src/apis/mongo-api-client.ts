/**
 * @file mongo api client
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// 接口文档 https://github.com/qbox/rmb-web/blob/master/admin-backend/pkg/mongo-api/apis.md
// TODO: https://github.com/qbox/rmb-web/issues/1052
// TODO: 记录 creator、editor 等信息？
// TODO: https://github.com/qbox/www/pull/2563#discussion_r875424340

import { injectable } from 'qn-fe-core/di'
import Client from 'qn-fe-core/client'

import BaseClient, {
  BaseClientOptions, BaseInternalOptions, BaseOptions, Output, WwwRefreshPath
} from 'apis/base-client'
import { apiMongo } from 'constants/api-prefix'
import { ReplaceValue } from 'utils/ts'
import { generateUuidId } from 'utils/uuid'
import { timeFormatterNum } from 'utils/time'

export const maxLimit = 999

export type Query = Record<string | number, any>

export interface TimeInfo {
  /** 10 位秒级 unix 时间戳 */
  createdAt: number
  /** 10 位秒级 unix 时间戳 */
  updatedAt: number
}

export interface StdInfo extends TimeInfo {
  /** 自定义 `primary_key` */
  id: string
}

export function generateStdInfo(): StdInfo {
  const id = generateUuidId()
  const time = timeFormatterNum()
  return {
    id,
    createdAt: time,
    updatedAt: time
  }
}

export interface ListOriginalOptions {
  query?: string
  offset?: number
  limit?: number
  sort?: string
}

export type ListBaseOptions = ReplaceValue<ListOriginalOptions, {
  query?: Query | ListOriginalOptions['query']
}>

export interface ListStdOptions {
  query?: Query
  /** 从 0 开始 */
  currentPage: number
  /** 缺省为 10 */
  pageSize?: number
  sort?: string
}

export interface ListOriginalResult<T> {
  count: number
  data: T[] | null
}

export interface ListBaseResult<T> {
  count: number
  data: T[]
}

export function normalizeListResult<T>(result: ListOriginalResult<T>): ListBaseResult<T> {
  return {
    count: result.count,
    data: result.data ?? []
  }
}

@injectable()
export class MongoApiBaseClient extends Client<unknown, unknown, Output, BaseClientOptions> {
  constructor(private baseClient: BaseClient) {
    super()
  }

  protected async _send(url: string, options: BaseInternalOptions) {
    return this.baseClient.send(`${apiMongo}/${url}`, options)
  }

  async list<T>(url: string, { query, ...params }: ListBaseOptions = {}): Promise<ListBaseResult<T>> {
    const options: ListOriginalOptions = {
      ...params,
      ...(query != null && { query: typeof query === 'string' ? query : JSON.stringify(query) })
    }
    const result = await this.get<ListOriginalResult<T>>(url, options)
    return normalizeListResult(result)
  }

  async getCount(url: string, query?: ListBaseOptions['query']): Promise<number> {
    const result = await this.list(url, { query, offset: 0, limit: 1 })
    return result.count
  }

  async listAll<T>(url: string, options: Omit<ListBaseOptions, 'offset' | 'limit'> = {}): Promise<T[]> {
    const first = await this.list<T>(url, { ...options, offset: 0, limit: maxLimit })
    if (first.count <= maxLimit) { // 大概率事件
      return first.data
    }

    const len = Math.ceil(first.count / maxLimit) - 1
    const paramsList = Array.from(Array(len), (_, i) => ({ ...options, offset: (i + 1) * maxLimit, limit: maxLimit }))
    const resultList = await Promise.all(paramsList.map(params => this.list<T>(url, params)))
    const list = first.data.concat(...resultList.map(result => result.data)) // flat
    return list
  }

  post<T>(url: string, payload: unknown, options: BaseOptions) {
    return super.post<T>(url, payload, options)
  }

  put<T>(url: string, payload: unknown, options: BaseOptions) {
    return super.put<T>(url, payload, options)
  }

  patch<T>(url: string, payload: unknown, options: BaseOptions) {
    return super.patch<T>(url, payload, options)
  }

  delete<T>(url: string, options: BaseOptions) {
    return super.delete<T>(url, options)
  }
}

/** 一类标准接口，绑定 `resource` 并且自动维护固定的 `StdInfo` 结构 */
// TODO: 各类接口实现补充完整，包括 batch 等
export class MongoApiStdClient<T> {
  constructor(private resource: string, private client: MongoApiBaseClient) {}

  get(id: string) {
    return this.client.get<T & StdInfo>(`${this.resource}/${id}`)
  }

  delete(id: string, wwwRefresh: WwwRefreshPath[]) {
    return this.client.delete<void>(`${this.resource}/${id}`, { wwwRefresh })
  }

  post(record: T, wwwRefresh: WwwRefreshPath[]) {
    const baseInfo = generateStdInfo()
    const data: T & StdInfo = {
      ...record,
      ...baseInfo
    }
    return this.client.post<T & StdInfo>(this.resource, data, { wwwRefresh })
  }

  // TODO: 再搞个不需要提供 StdInfo 的更方便的 put 方法
  put(record: T & Omit<StdInfo, 'updatedAt'>, wwwRefresh: WwwRefreshPath[]) {
    const baseInfo = generateStdInfo()
    const data: T & StdInfo = {
      ...record,
      updatedAt: baseInfo.updatedAt
    }
    delete (data as any)._id // FIXME: 需要干这件事也有点奇怪… 查一下其他接口需不需要这个
    return this.client.put<T & StdInfo>(`${this.resource}/${record.id}`, data, { wwwRefresh })
  }

  patch(id: string, record: Partial<T>, wwwRefresh: WwwRefreshPath[]) {
    const baseInfo = generateStdInfo()
    const data: Partial<T> & Omit<StdInfo, 'createdAt'> = {
      ...record,
      id,
      updatedAt: baseInfo.updatedAt
    }
    return this.client.patch<T & StdInfo>(`${this.resource}/${id}`, data, { wwwRefresh })
  }

  getCount(query?: Query) {
    return this.client.getCount(this.resource, query)
  }

  // TODO: 貌似基于 offset 和 limit 的接口也是应该留着的…
  list({ currentPage, pageSize = 10, ...params }: ListStdOptions) {
    const options: ListBaseOptions = {
      sort: '-updatedAt',
      ...params,
      offset: currentPage * pageSize,
      limit: pageSize
    }
    return this.client.list<T & StdInfo>(this.resource, options)
  }

  listAll(options: Omit<ListStdOptions, 'currentPage' | 'pageSize'> = {}) {
    return this.client.listAll<T & StdInfo>(this.resource, options)
  }
}
