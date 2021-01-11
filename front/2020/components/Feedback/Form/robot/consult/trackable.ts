/**
 * @file 神策统计逻辑抽取
 */

import { track } from 'utils/sensors'

/** 统计数据中标识未能识别用户输入 */
const notFoundSymbol = '[not found]'

/** 统计数据中标识出错的情况 */
const errorSymbol = '[error]'

export default abstract class Trackable {

  protected abstract id: string
  protected abstract state: string

  /** 神策统计对话事件，一次事件对应一次 input & output */
  protected trackConsult(input: string, output: string) {
    track('ConsultIO', {
      ConsultInput: input,
      ConsultOutput: output,
      ConsultChatId: this.id,
      ConsultState: this.state
    })
  }

  /** 无法识别输入时统计 */
  protected trackConsultNotFound(input: string) {
    return this.trackConsult(input, notFoundSymbol)
  }

  /** 处理出错时统计 */
  protected trackConsultError(input: string) {
    return this.trackConsult(input, errorSymbol)
  }
}
