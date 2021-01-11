/**
 * @file 咨询之售前服务机器人
 */

import React from 'react'
import { timeout } from 'utils'
import { listEntitiesWithProperties as listEntities, EntityWithProperties as Entity } from 'apis/admin/consult'
import { matchNameAndKeywords } from 'utils/match'
import { IRobot, Input as InputData, Processed, InputType, makeMessage, MessageContent, makeSelect } from '..'
import Trackable from './trackable'
import ProductIntro from './ProductIntro'
import FormInvoker from './FormInvoker'
import Text from './Text'

enum State {
  /** 初始状态 */
  Initial = 'initial',
  /** 已有实体信息，需要获取属性信息 */
  WithEntity = 'with-entity',
  /** 用户填写咨询表单中 */
  FormSubmiting = 'form-submiting',
}

/** 可选实体列表 */
const entityOptions = ['对象存储', 'CDN', '云主机', '短视频', '直播云']

/** 供用户选择实体的消息 */
const entitySelectMessage = makeSelect({
  options: entityOptions,
  after: '都不是？请直接输入产品名称。'
})

/** 供用户选择属性的消息 */
function makePropertySelectMessage(entity: Entity) {
  return makeSelect({
    before: '你是想咨询该产品的什么问题？',
    options: entity.properties.map(property => property.name),
    after: '都不是？请输入你的问题。'
  })
}

let cache: Promise<Entity[]> | undefined

async function fetchEntitiesWithCache() {
  if (cache != null) return cache
  cache = listEntities()
  return cache
}

export default class PreSalesRobot extends Trackable implements IRobot {

  constructor(protected id: string) {
    super()
  }

  protected state = State.Initial
  private entity: Entity | undefined

  /** 结束一轮对话 */
  private finish() {
    this.state = State.Initial
    this.entity = undefined
    return [
      timeout(3000).then(() => makeMessage('请问还想咨询哪款产品？')),
      entitySelectMessage
    ]
  }

  /** 遇到理解不了的输入 */
  private notFound(message: string, consult = message) {
    this.trackConsultNotFound(message)
    return [
      makeMessage(
        <>
          抱歉，牛小七回答不出你的问题T T，你可以提交&nbsp;
          <FormInvoker consult={consult}>问题反馈</FormInvoker>&nbsp;
          ，我们会尽快安排客服人员联系你
        </>
      ),
      ...this.finish()
    ]
  }

  private async processMessageOnInitial(message: MessageContent) {
    if (typeof message !== 'string') return
    const entities = await fetchEntitiesWithCache()
    const matchedEntity = matchNameAndKeywords(message, entities)
    if (matchedEntity == null) return this.notFound(message)

    this.trackConsult(message, matchedEntity.name)

    this.state = State.WithEntity
    this.entity = matchedEntity
    return [
      makeMessage(<ProductIntro name={matchedEntity.name} desc={getDesc(matchedEntity)} />),
      makePropertySelectMessage(matchedEntity)
    ]
  }

  private processMessageOnWithEntity(message: MessageContent): Processed {
    if (typeof message !== 'string') return
    const entity = this.entity!
    const matchedProperty = matchNameAndKeywords(message, entity.properties)
    if (matchedProperty == null) {
      const consult = entity.name + message
      return this.notFound(message, consult)
    }

    this.trackConsult(message, matchedProperty.name)

    return [
      makeMessage(<Text content={matchedProperty.answer} />),
      ...this.finish()
    ]
  }

  private processMessage(message: MessageContent): Processed {
    switch (this.state) {
      case State.Initial:
        return this.processMessageOnInitial(message)
      case State.WithEntity:
        return this.processMessageOnWithEntity(message)
      default:
    }
  }

  process(input: InputData): Processed {
    switch (input.type) {
      case InputType.Initial:
        fetchEntitiesWithCache() // 提前拉取以缓存结果
        return [
          makeMessage('请问想咨询哪款产品？'),
          entitySelectMessage
        ]
      case InputType.Message:
        return this.processMessage(input.content)
      case InputType.FormSubmitted:
        return makeMessage('表单提交成功，我们会尽快联系你')
      default:
    }
  }
}

function getDesc(entity: Entity) {
  const propertyDesc = entity.properties.find(property => property.isDesc)
  return propertyDesc != null ? propertyDesc.answer : '暂无简介'
}
