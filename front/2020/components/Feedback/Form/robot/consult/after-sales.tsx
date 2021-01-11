/**
 * @file 咨询之售后服务机器人
 */

import React from 'react'
import { textProcess, TextProcessOutputType as OutputType } from 'apis/admin/consult'
import { timeout } from 'utils'
import { IRobot, Input as InputData, InputType, makeMessage, MessageContent, makeSelect } from '..'
import Trackable from './trackable'
import Text from './Text'

const errorMessage = '出错了，请稍后重试'

export default class AfterSalesRobot extends Trackable implements IRobot {
  constructor(protected id: string) {
    super()
  }

  protected state = ''

  /** 会话标识，每轮对话使用不同的 session id */
  private sessionId = 0

  private resetSession() {
    this.sessionId++
  }

  private async processMessage(message: MessageContent) {
    const messageText = message + ''
    const processed = await textProcess({
      terminalId: `${this.id}-${this.sessionId}`,
      content: messageText
    })
    switch (processed.type) {
      case OutputType.Related: {
        const options = processed.responses.map(response => response.content)
        this.trackConsult(messageText, options.join(' | '))
        return makeSelect({
          before: '猜你想问：',
          options,
          after: '都不是？请换个方式描述下你的问题',
          mode: 'long'
        })
      }
      case OutputType.Answer:
      case OutputType.Fallback: {
        this.resetSession()
        const response = processed.responses[0].content

        if (processed.type === OutputType.Fallback) {
          this.trackConsultNotFound(messageText)
        } else {
          this.trackConsult(messageText, response)
        }

        return [
          makeMessage(<Text content={response} />),
          timeout(3000).then(() => makeMessage('请问还有别的问题吗？'))
        ]
      }
      case OutputType.Error: {
        this.trackConsultError(messageText)
        return makeMessage(errorMessage)
      }
      default:
    }
  }

  async process(input: InputData) {
    switch (input.type) {
      case InputType.Initial:
        return makeMessage('请输入你要咨询的问题')
      case InputType.Message:
        return this.processMessage(input.content)
      default:
    }
  }
}
