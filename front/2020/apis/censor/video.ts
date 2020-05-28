/**
 * @file 内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/censor/api/5620/video-censor
 */

import { timeout } from 'utils'
import { post, get } from 'utils/fetch'
import { Suggestion, Scene, SceneResultDetail, apiPrefix, failedMsg } from './common'

export { defaultParams } from './common'

export type SceneResultCut = {
  suggestion: Suggestion
  offset: number
  uri?: string
  details?: SceneResultDetail[]
}

export type SceneResult = {
  suggestion: Suggestion
  cuts: SceneResultCut[]
}

export type Result = {
  suggestion: Suggestion
  scenes: {
    [scene in Scene]: SceneResult
  }
}

export type VideoJobStatus = 'WAITING' | 'DOING' | 'RESCHEDULED' | 'FAILED' | 'FINISHED'

export type CreateVideoJobRes = {
  job: string
}

export type CreateVideoJobOptions = {
  data: { uri: string },
  params: { scenes: Scene[] }
}

async function createVideoJob(options: CreateVideoJobOptions): Promise<CreateVideoJobRes> {
  if (typeof window === 'undefined') {
    await timeout(300)
    return { job: '5ebe37de3d07ee0007d4db61' }
  }
  return post(`${apiPrefix}/v3/video/censor`, options)
}

export type VideoJobResult = {
  suggestion: Suggestion
  scenes: {
    [scene in Scene]: SceneResult
  }
}

export type GetVideoJobRes = {
  id: string
  request: unknown
  result?: {
    code: number
    message?: string
    result: VideoJobResult
  }
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

export async function videoCensor(options: CreateVideoJobOptions) {
  const jobId = (await createVideoJob(options)).job

  let shouldRetry = maxRetry

  while (shouldRetry--) {
    // eslint-disable-next-line no-await-in-loop
    const res = await getVideoJob(jobId)
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
