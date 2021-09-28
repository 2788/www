/**
 * @file 官网在线咨询功能，关键词匹配逻辑“实体”相关接口
 */

import moment from 'moment'
import { injectable } from 'qn-fe-core/di'
import FetchStore from 'stores/fetch'
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
    private fetchStore: FetchStore,
    private propertyApis: PropertyApis
  ) { }

  add(options: EntityData) {
    const now = moment().unix()
    return this.fetchStore.postJSON(`${apiMongo}/${resourceName}`, {
      ...options,
      createTime: now,
      editTime: now
    }) as Promise<Entity>
  }

  update(id: string, options: Partial<EntityData>) {
    return this.fetchStore.patchJSON(`${apiMongo}/${resourceName}/${id}`, {
      ...options,
      editTime: moment().unix()
    }) as Promise<void>
  }

  delete(id: string) {
    return this.fetchStore.delete(`${apiMongo}/${resourceName}/${id}`) as Promise<void>
  }

  async list(): Promise<Entity[]> {
    const res = await this.fetchStore.get(`${apiMongo}/${resourceName}`, { sort: '-createTime' })
    return (res.data || []) as Entity[]
  }

  /** 列出所有实体，并带上实体对应的属性信息 */
  async listWithProperties(): Promise<EntityWithProperties[]> {
    const [entities, properties] = await Promise.all<Entity[], Property[]>([
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
    return this.fetchStore.delete(`${apiMongo}/${resourceName}/${id}`) as Promise<void>
  }
}
