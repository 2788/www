/**
 * @file 内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/censor/api/5588/image-censor
 */

import { timeout } from 'utils'
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
  // mock API, TODO: 换成真的接口
  if (typeof window === 'undefined') {
    await timeout(300)
    /* eslint-disable */
    return {"suggestion":"block","scenes":{"ads":{"suggestion":"pass","details":[{"suggestion":"pass","label":"normal","score":0.999}]},"politician":{"suggestion":"pass"},"pulp":{"suggestion":"pass","details":[{"suggestion":"pass","label":"normal","score":0.97706}]},"terror":{"suggestion":"block","details":[{"suggestion":"pass","label":"army","score":0.71239},{"suggestion":"block","label":"guns","score":0.99629366,"detections":[{"pts":[[233,127],[730,127],[730,312],[233,312]],"score":0.99629366},{"pts":[[711,547],[1093,547],[1093,779],[711,779]],"score":0.9948548}]}]}}}
    /* eslint-enable */
  }
  const response: ImageCensorResponse = await post(`${apiPrefix}/v3/image/censor`, options)
  if (response.code !== 200) {
    throw new Error(failedMsg)
  }
  return response.result
}
