/**
 * @file 咨询机器人相关接口
 * @description 主要是用于匹配的关键词信息
 */

import { get, post } from 'utils/fetch'
import { mongoApiPrefix, wwwApiPrefix, handleResponseData } from '.'

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
  const res = await get(`${mongoApiPrefix}/www-consult-property`, { limit: 1000 })
  return handleResponseData(res)
}

async function listEntities(): Promise<Entity[]> {
  const res = await get(`${mongoApiPrefix}/www-consult-entity`, { limit: 1000 })
  return handleResponseData(res)
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

export interface TextProcessInput {
  /** 终端标识，每个终端(或线程)对应一个，区分并发多用户 */
  terminalId: string
  content: string
}

export interface TextProcessResponseItem {
  content: string
}

export enum TextProcessOutputType {
  /** 中间逻辑出错 */
  Error = '0',
  /** 任务型机器人 */
  Task = '1',
  /** 问答型机器人 */
  Answer = '2',
  /** 闲聊型机器人 */
  Chat = '3',
  /** 未匹配上，返回预设兜底话术 */
  Fallback = '5',
  /** 未匹配上，返回相似问题列表 */
  Related = '6',
}

export interface TextProcessOutput {
  type: TextProcessOutputType
  responses: TextProcessResponseItem[]
}

export async function textProcess(input: TextProcessInput): Promise<TextProcessOutput> {
  return post(`${wwwApiPrefix}/consult/text-process`, input)
}
