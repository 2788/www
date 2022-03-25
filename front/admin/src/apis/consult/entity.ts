/**
 * @file 官网在线咨询功能，关键词匹配逻辑“实体”相关接口
 */

import moment from 'moment'
import { injectable } from 'qn-fe-core/di'
import { BaseClient } from 'admin-base/common/apis/base'

import { apiMongo } from 'constants/api-prefix'
import PropertyApis, { Property } from './property'

export interface EntityData {
  /** 实体名称 */
  name: string
  /** 匹配关键字 */
  keywords: string[]
}

export interface Entity extends EntityData {
  /** 唯一标识（mongo ObjectID），由 mongo-api 自动生成 */
  _id: string
  /** 创建时间，单位秒 */
  createTime: number
  /** 修改时间，单位秒 */
  editTime: number
}

export interface EntityWithProperties extends Entity {
  /** 实体对应的所有属性 */
  properties: Property[]
}

const resourceName = 'www-consult-entity'

@injectable()
export default class EntityApis {

  constructor(
    private client: BaseClient,
    private propertyApis: PropertyApis
  ) { }

  add(options: EntityData) {
    const now = moment().unix()
    return this.client.post<Entity>(`${apiMongo}/${resourceName}`, {
      ...options,
      createTime: now,
      editTime: now
    })
  }

  update(id: string, options: Partial<EntityData>) {
    return this.client.patch<void>(`${apiMongo}/${resourceName}/${id}`, {
      ...options,
      editTime: moment().unix()
    })
  }

  delete(id: string) {
    return this.client.delete<void>(`${apiMongo}/${resourceName}/${id}`)
  }

  async list(): Promise<Entity[]> {
    const res: any = await this.client.get(`${apiMongo}/${resourceName}`, { sort: '-createTime' })
    return (res.data || []) as Entity[]
  }

  /** 列出所有实体，并带上实体对应的属性信息 */
  async listWithProperties(): Promise<EntityWithProperties[]> {
    const [entities, properties] = await Promise.all([
      this.list(),
      this.propertyApis.list()
    ])
    return entities.map(entity => ({
      ...entity,
      // eslint-disable-next-line no-underscore-dangle
      properties: properties.filter(item => item.entityId === entity._id)
    }))
  }

  /** 删除指定实体，并删除实体对应的所有属性 */
  async deleteWithProperties(id: string) {
    const properties = await this.propertyApis.list({ entityId: id })
    await Promise.all(properties.map(
      property => this.propertyApis.delete(property._id)
    ))
    return this.client.delete<void>(`${apiMongo}/${resourceName}/${id}`)
  }
}
