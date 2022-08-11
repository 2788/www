/**
 * @file 官网在线咨询功能，关键词匹配逻辑“属性”相关接口
 */

import moment from 'moment'
import { injectable } from 'qn-fe-core/di'

import BaseClient, { RefreshOptions } from 'apis/base-client'
import { apiMongo } from 'constants/api-prefix'

export interface PropertyData {
  /** 属性名称 */
  name: string
  /** 对应的实体 ID */
  entityId: string
  /** 是否是实体的默认描述 */
  isDesc: boolean
  /** 匹配关键字 */
  keywords: string[]
  /** 匹配成功后对应的答案 */
  answer: string
}

export interface Property extends PropertyData {
  /** 唯一标识（mongo ObjectID），由 mongo-api 自动生成 */
  _id: string
  /** 创建时间，单位秒 */
  createTime: number
  /** 修改时间，单位秒 */
  editTime: number
}

const resourceName = 'www-consult-property'
const refreshPathsOptions: RefreshOptions = { wwwRefresh: [] }

@injectable()
export default class PropertyApis {

  constructor(private client: BaseClient) { }

  add(options: PropertyData) {
    const now = moment().unix()
    return this.client.post<Property>(`${apiMongo}/${resourceName}`, {
      ...options,
      createTime: now,
      editTime: now
    }, refreshPathsOptions)
  }

  update(id: string, options: Partial<PropertyData>) {
    return this.client.patch<void>(`${apiMongo}/${resourceName}/${id}`, {
      ...options,
      editTime: moment().unix()
    }, refreshPathsOptions)
  }

  delete(id: string) {
    return this.client.delete<void>(`${apiMongo}/${resourceName}/${id}`, refreshPathsOptions)
  }

  async list(query?: Record<string, unknown>) {
    const res: any = await this.client.get(`${apiMongo}/${resourceName}`, {
      query: JSON.stringify(query),
      sort: '-createTime'
    })
    return (res.data || []) as Property[]
  }
}
