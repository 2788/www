/**
 * @file 咨询功能对应的机器人
 */

import { uuid } from 'utils'
import { IRobot, Input as InputData, InputType, makeMessage, makeSelect } from '..'
import PreSalesRobot from './pre-sales'
import AfterSalesRobot from './after-sales'
import Trackable from './trackable'

enum State {
  /** 初始状态 */
  Initial = 'initial',
  /** 售前咨询 */
  PreSales = 'pre-sales',
  /** 售后咨询 */
  AfterSales = 'after-sales'
}

const optionPreSales = '售前咨询'
const optionAfterSales = '售后服务'

const promptMessage = makeSelect({
  before: '请选择服务类型：',
  options: [optionPreSales, optionAfterSales]
})
export default class ConsultRobot extends Trackable implements IRobot {

  protected id = `consult-${uuid()}`
  protected state = State.Initial

  private preSalesRobot = new PreSalesRobot(this.id)
  private afterSalesRobot = new AfterSalesRobot(this.id)

  processOnInitial(input: InputData) {
    switch (input.type) {
      case InputType.Initial:
        return [
          makeMessage('Hi，我是牛小七，很高兴为你服务！请问有什么可以帮你的？'),
          promptMessage
        ]
      case InputType.Message: {
        switch (input.content) {
          case optionPreSales:
            this.trackConsult(optionPreSales, '')
            this.state = State.PreSales
            return this.preSalesRobot.process({ type: InputType.Initial })
          case optionAfterSales:
            this.trackConsult(optionAfterSales, '')
            this.state = State.AfterSales
            return this.afterSalesRobot.process({ type: InputType.Initial })
          default:
            this.trackConsultNotFound(input.content + '')
            return promptMessage
        }
      }
      default:
    }
  }

  process(input: InputData) {
    switch (this.state) {
      case State.Initial: return this.processOnInitial(input)
      case State.PreSales: return this.preSalesRobot.process(input)
      case State.AfterSales: return this.afterSalesRobot.process(input)
      default:
    }
  }
}
