/**
 * @file 意图明确的咨询机器人
 * @description 调起这个机器人时应当有明确的意图（某个需要咨询的关键词）
 */

import React, { useState, useEffect } from 'react'
import { uuid } from 'utils'
import { track as sensorsTrack } from 'utils/sensors'
import { IRobot, Input as InputData, Processed, InputType, makeMessage, MessageSelect, MessageSelectOption, makeAction } from '..'
import humanServiceQrCode from '../../human-service-qr-code.png'
import Trackable from './trackable'
import { FormModal } from './FormInvoker'

enum State {
  /** 初始状态 */
  Initial = 'initial'
}

export default class IntentConsultRobot extends Trackable implements IRobot {

  protected id = `consult-${uuid()}`
  protected state = State.Initial

  constructor(private intention: string) {
    super()
  }

  process(input: InputData): Processed {
    switch (input.type) {
      case InputType.Initial:
        return [
          makeMessage('Hi，我是牛小七，很高兴为你服务！'),
          makeMethodSelect(this.intention)
        ]
      case InputType.Message:
        if (input.content === '微信联系') {
          return [
            makeMessage('扫码添加人工客服企业微信二维码进行咨询（工作日 09:00-18:00 在线）。'),
            makeMessage(<HumanServiceQrCode />)
          ]
        }
        return makeMethodSelect(this.intention)
      case InputType.FormSubmitted:
        return makeMessage('表单提交成功，我们会在 2 个工作日内联系你。')
      default:
    }
  }
}

// “提交表单”选项，点击会调起 form modal
function FormOption({ intention }: { intention: string }) {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <MessageSelectOption onClick={() => setVisible(true)}>提交表单</MessageSelectOption>
      <FormModal consult={intention} visible={visible} onClose={() => setVisible(false)} />
    </>
  )
}

function makeMethodSelect(intention: string) {
  return makeAction(
    <MessageSelect before="你可以通过以下方式与售前工程师建立联系，获取一对一服务">
      <MessageSelectOption>微信联系</MessageSelectOption>
      <FormOption intention={intention} />
    </MessageSelect>
  )
}

function HumanServiceQrCode() {
  useEffect(() => sensorsTrack('WechatQRCodeShow', { source: 'feedback-modal-content' }), [])

  return <img style={{ width: '126px', height: '126px' }} src={humanServiceQrCode} alt="人工客服企业微信二维码" />
}
