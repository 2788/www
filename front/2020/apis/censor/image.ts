/**
 * @file 内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/censor/api/5588/image-censor
 */

import { post } from 'utils/fetch'
import { Suggestion, Scene, SceneResultDetail, apiPrefix, failedMsg, getFullUrl } from './common'

export { defaultParams } from './common'

export type SceneResult = {
  suggestion: Suggestion
  details?: SceneResultDetail[]
}

export type ImageCensorRes = {
  suggestion: Suggestion
  scenes: {
    [scene in Scene]: SceneResult
  }
}

export type ImageCensorResponse = {
  code: number
  message?: string
  result: ImageCensorRes
}

export type ImageCensorOptions = {
  data: {
    uri: string
  },
  params: {
    scenes: Scene[]
  }
}

export async function imageCensor(options: ImageCensorOptions): Promise<ImageCensorRes> {
  options.data.uri = getFullUrl(options.data.uri)
  const response: ImageCensorResponse = await post(`${apiPrefix}/v3/image/censor`, options)
  if (response.code !== 200) {
    throw new Error(failedMsg)
  }
  return response.result
}
