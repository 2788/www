/**
 * @file 内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/dora/5995/ali-text-anti-spam-service
 */

import { post } from 'utils/fetch'
import {
  failedMsg,
  Suggestion,
  censorOpenApiPrefix
} from './common'

export { defaultParams } from './common'

export type TextCensorDetail = {
  label: string
  contexts?: object[]
}

export type TextCensorRes = {
  msg: string
  content?: string
  filteredContent: string
  results?: Array<{
    label: string
    rate: number
    scene: string
    suggestion: Suggestion
    detail?: TextCensorDetail[]
  }>
  taskId: string
}

export type TextCensorResponse = {
  code: number
  data?: TextCensorRes[]
  msg: string
  requestId: string
}

export type TextCensorOptions = {
  data: string
}

export async function textCensor(options: TextCensorOptions): Promise<TextCensorRes> {
  const response: TextCensorResponse = await post(`${censorOpenApiPrefix}/ali/textscan/handler`, options)
  if (response.code !== 200 || !response.data) {
    throw new Error(failedMsg)
  }
  return response.data[0]
}
