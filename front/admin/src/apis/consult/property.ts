/**
 * @file 官网在线咨询功能，关键词匹配逻辑“属性”相关接口
 */

import moment from 'moment'
import { injectable } from 'qn-fe-core/di'
import FetchStore from 'stores/fetch'
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

@injectable()
export default class PropertyApis {

  constructor(private fetchStore: FetchStore) { }

  add(options: PropertyData) {
    const now = moment().unix()
    return this.fetchStore.postJSON(`${apiMongo}/${resourceName}`, {
      ...options,
      createTime: now,
      editTime: now
    }) as Promise<Property>
  }

  update(id: string, options: Partial<PropertyData>) {
    return this.fetchStore.patchJSON(`${apiMongo}/${resourceName}/${id}`, {
      ...options,
      editTime: moment().unix()
    }) as Promise<void>
  }

  delete(id: string) {
    return this.fetchStore.delete(`${apiMongo}/${resourceName}/${id}`) as Promise<void>
  }

  async list(query?: Record<string, unknown>) {
    const res = await this.fetchStore.get(`${apiMongo}/${resourceName}`, {
      query: JSON.stringify(query),
      sort: '-createTime'
    })
    return (res.data || []) as Property[]
  }
}
