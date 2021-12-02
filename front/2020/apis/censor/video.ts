/**
 * @file 内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/censor/api/5620/video-censor
 */

import { timeout } from 'utils'
import { post, get } from 'utils/fetch'
import { apiPrefix, failedMsg } from './common'

import type { Params, Options, ResultWrapper, Result, SceneResult, Scene, Suggestion } from './censor-types'
import type { ImageDetail } from './image'

export const defaultVideoParams: Params = {
  scenes: ['pulp', 'terror', 'politician', 'ads']
}

export interface ICutDetail extends ImageDetail {
  suggestion: Suggestion
}

export type IVideoCutResult = {
  offset: number
  suggestion: Suggestion
  details?: ICutDetail[]
}

export interface VideoSceneResult extends SceneResult {
  cuts: IVideoCutResult[]
}

export type VideoScenesResult = {
  [scene in Scene]?: VideoSceneResult
}
export interface VideoResult extends Result {
  scenes: VideoScenesResult
}

export type VideoJobStatus = 'WAITING' | 'DOING' | 'RESCHEDULED' | 'FAILED' | 'FINISHED'

export type CreateVideoJobRes = {
  job: string
}

async function createVideoJob(options: Options): Promise<CreateVideoJobRes> {
  if (typeof window === 'undefined') {
    await timeout(300)
    return { job: '5ebe37de3d07ee0007d4db61' }
  }
  return post(`${apiPrefix}/v3/video/censor`, options)
}

export type GetVideoJobRes = {
  id: string
  request: unknown
  result?: ResultWrapper<VideoResult>
  status: VideoJobStatus
  created_at: string
  updated_at: string
  rescheduled_at: string
}

async function getVideoJob(jobId: string): Promise<GetVideoJobRes> {
  return get(`${apiPrefix}/v3/jobs/video/${jobId}`)
}

// 设定最大次数的轮询
const pollInterval = 1000
const maxRetry = 30

export async function videoCensor(options: Options) {
  const jobId = (await createVideoJob(options)).job

  let shouldRetry = maxRetry

  while (shouldRetry--) {
    let res
    try {
      // eslint-disable-next-line no-await-in-loop
      res = await getVideoJob(jobId)
    } catch {
      throw new Error(failedMsg)
    }
    if (res.status === 'FINISHED') {
      const result = res.result!
      if (result.code !== 200) {
        throw new Error(failedMsg)
      }
      return result.result
    }
    if (res.status === 'FAILED') {
      throw new Error(failedMsg)
    }
    // eslint-disable-next-line no-await-in-loop
    await timeout(pollInterval)
  }

  throw new Error('等待超时，请稍后再试')
}
