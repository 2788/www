/**
 * @file 内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/dora/5995/ali-text-anti-spam-service
 */

import { post } from 'utils/fetch'
import {
  Scene,
  apiPrefix,
  failedMsg
} from './common'
import type { ImageCensorResponse } from './image'

export type TextCensorResponse = ImageCensorResponse

export type TextCensorOptions = {
  data: {
    text: string
  },
  params: {
    scenes: Scene[]
  }
}

export const defaultParams: TextCensorOptions['params'] = {
  scenes: ['antispam']
}

export async function textCensor(options: TextCensorOptions): Promise<TextCensorResponse['result']> {
  const response: TextCensorResponse = await post(`${apiPrefix}/v3/text/censor`, options)
  if (response.code !== 200) {
    throw new Error(failedMsg)
  }
  return response.result
}
