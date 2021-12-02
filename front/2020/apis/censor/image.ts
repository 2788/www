/**
 * @file 内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/censor/api/5588/image-censor
 */

import { post } from 'utils/fetch'
import {
  apiPrefix,
  failedMsg,
  getFullUrl
} from './common'

import type { Options, Params, ResultWrapper, Result, Scene, SceneResult, Suggestion } from './censor-types'

export const defaultImageParams: Params = {
  scenes: ['pulp', 'terror', 'politician', 'ads', 'behavior']
}

export type ImageDetection ={
  pts: Array<[number, number]>
  score: number
}

export type ImageDetail = {
  label?: string
  score?: number
  suggestion?: Suggestion
  group?: string
  detections?: ImageDetection[]
}
export interface ImageSceneResult extends SceneResult {
  details?: ImageDetail[]
}

export type ImageScenesResult = {
  [scene in Scene]?: ImageSceneResult
}
export interface ImageResult extends Result {
  scenes: ImageScenesResult
}

export async function imageCensor(options: Options): Promise<ImageResult> {
  options.data.uri = getFullUrl(options.data.uri)
  const response: ResultWrapper<ImageResult> = await post(`${apiPrefix}/v3/image/censor`, options)
  if (response.code !== 200) {
    throw new Error(failedMsg)
  }
  return response.result
}

