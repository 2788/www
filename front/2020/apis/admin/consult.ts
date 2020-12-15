/**
 * @file 咨询机器人相关接口
 * @description 主要是用于匹配的关键词信息
 */

import { get } from 'utils/fetch'
import { apiPrefix } from '.'

export interface Property {
  /** 唯一标识（mongo ObjectID），由 mongo-api 自动生成 */
  _id: string
  /** 所属的实体 ID */
  entityId: string
  /** 属性名称 */
  name: string
  /** 是否是实体的介绍内容 */
  isDesc: boolean
  /** 匹配关键字 */
  keywords: string[]
  /** 匹配成功后对应的答案 */
  answer: string
}

export interface Entity {
  /** 唯一标识（mongo ObjectID），由 mongo-api 自动生成 */
  _id: string
  /** 实体名称 */
  name: string
  /** 匹配关键字 */
  keywords: string[]
}

export interface EntityWithProperties extends Entity {
  /** 实体对应的所有属性 */
  properties: Property[]
}

async function listProperties(): Promise<Property[]> {
  const res = await get(`${apiPrefix}/www-consult-property`, { limit: 1000 })
  return res || []
}

async function listEntities(): Promise<Entity[]> {
  const res = await get(`${apiPrefix}/www-consult-entity`, { limit: 1000 })
  return res || []
}

export async function listEntitiesWithProperties(): Promise<EntityWithProperties[]> {
  const [properties, entities] = await Promise.all([
    listProperties(),
    listEntities()
  ] as const)

  return entities.map(entity => ({
    ...entity,
    // eslint-disable-next-line no-underscore-dangle
    properties: properties.filter(item => item.entityId === entity._id)
  }))
}
