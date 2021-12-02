/**
 * @file 内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/censor/7260/api-text-censor
 */

import { post } from 'utils/fetch'
import {
  apiPrefix,
  failedMsg
} from './common'
import type { Options, TextData, Result, ResultWrapper, Params } from './censor-types'

export const defaultTextParams: Params = {
  scenes: ['antispam']
}

export async function textCensor(options: Options<TextData>): Promise<Result> {
  const response: ResultWrapper = await post(`${apiPrefix}/v3/text/censor`, options)
  if (response.code !== 200) {
    throw new Error(failedMsg)
  }
  return response.result
}
