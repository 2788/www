/**
 * @file 咨询功能对应的机器人
 */

import React from 'react'
import { IRobot, Input as InputData, Processed, InputType, makeMessage, MessageContent, makeForm } from '..'
import { MessageLink } from '../utils'
import Form, { FormValue } from './Form'

enum State {
  /** 初始状态 */
  Initial,
  /** 开始咨询后，等待用户输入咨询的内容 */
  Consulting,
  /** 记录了咨询内容，等待用户提交联系方式表单 */
  AskingContact
}

export const startConsultingMessage = '开始咨询'

const createTicketLinkView = (
  <a target="_blank" rel="noopener" href="https://support.qiniu.com/tickets/new">提交工单</a>
)

const consultLinkView = (
  <MessageLink message={startConsultingMessage}>{startConsultingMessage}</MessageLink>
)

const initialMessage = makeMessage(
  <>
    <p>欢迎来到七牛，非常高兴为您服务！</p>
    <p style={{ marginTop: '8px' }}>售后问题：{createTicketLinkView}</p>
    <p style={{ marginTop: '4px' }}>咨询内容：{consultLinkView}</p>
    <p style={{ marginTop: '4px' }}>电话咨询：<a href="tel:400-808-9176">400-808-9176 转 1</a></p>
  </>
)

const notFoundMessage = makeMessage(
  <>
    根据您当前输入的内容，没有找到合适的业务相关的答案，
    如需咨询：{consultLinkView}&nbsp;
    如需更多帮助：{createTicketLinkView}
  </>
)

export default class ConsultRobot implements IRobot {

  private state = State.Initial

  private processMessageOnInitial(message: MessageContent): Processed {
    if (message === startConsultingMessage) {
      this.state = State.Consulting
      return makeMessage('请输入你要咨询的内容')
    }
    return notFoundMessage
  }

  private processMessageOnConsulting(message: MessageContent): Processed {
    if (typeof message !== 'string') return
    if (message.length > 255) {
      return makeMessage('抱歉，最多可输入 255 字，请重新输入')
    }
    this.state = State.AskingContact
    return [
      makeMessage('收到！您要咨询的内容，我们后台已经录入'),
      makeForm<FormValue>(({ onSubmit }) => <Form consultContent={message} onSubmit={onSubmit} />)
    ]
  }

  private processMessageOnAskingContact(message: MessageContent): Processed {
    if (message === startConsultingMessage) {
      this.state = State.Consulting
      return makeMessage('请输入你要咨询的内容')
    }
    return notFoundMessage
  }

  private processMessage(message: MessageContent): Processed {
    switch (this.state) {
      case State.Initial:
        return this.processMessageOnInitial(message)
      case State.Consulting:
        return this.processMessageOnConsulting(message)
      case State.AskingContact:
        return this.processMessageOnAskingContact(message)
      default:
        return notFoundMessage
    }
  }

  private handleFormSubmit(): Processed {
    this.state = State.Initial
    return makeMessage('提交成功，我们会尽快与您联系')
  }

  process(input: InputData): Processed {
    switch (input.type) {
      // 初始化
      case InputType.Initial:
        this.state = State.Initial
        return initialMessage
      case InputType.Message:
        return this.processMessage(input.content)
      case InputType.FormSubmit:
        return this.handleFormSubmit()
      default:
        return notFoundMessage
    }
  }
}
