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
  job_id: string
}

export type CreateVideoJobOptions = {
  data: { uri: string },
  params: { scenes: Scene[] }
}

async function createVideoJob(options: CreateVideoJobOptions): Promise<CreateVideoJobRes> {
  if (typeof window !== 'undefined') {
    await timeout(300)
    return { job_id: '5ebe37de3d07ee0007d4db61' }
  }
  return post(`${apiPrefix}/video/censor`, options)
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
  // mock API, TODO: 换成真的接口
  if (typeof window !== 'undefined') {
    await timeout(300)
    const finished = Math.random() > 0.5
    /* eslint-disable */
    return (
      finished
      ? {"id":"5ebe37de3d07ee0007d4db61","request":{"data":{"uri":"https://dn-mars-assets.qbox.me/Fi1UC6waXtXYCpnTGHa8XxIziGNk"},"params":{"sync":false,"scenes":["pulp","terror","politician","ads"]}},"status":"FINISHED","result":{"code":200,"message":"OK","result":{"suggestion":"review","scenes":{"ads":{"cuts":[{"details":[{"label":"normal","score":0.999,"suggestion":"pass"}],"offset":0,"suggestion":"pass"},{"details":[{"label":"normal","score":0.999,"suggestion":"pass"}],"offset":5005,"suggestion":"pass"},{"details":[{"label":"normal","score":0.999,"suggestion":"pass"}],"offset":10010,"suggestion":"pass"}],"suggestion":"pass"},"politician":{"cuts":[{"offset":0,"suggestion":"pass"},{"offset":5005,"suggestion":"pass"},{"offset":10010,"suggestion":"pass"}],"suggestion":"pass"},"pulp":{"cuts":[{"details":[{"label":"normal","score":0.95569,"suggestion":"pass"}],"offset":0,"suggestion":"pass"},{"details":[{"label":"normal","score":0.90453,"suggestion":"pass"}],"offset":5005,"suggestion":"pass"},{"details":[{"label":"sexy","score":0.49797666,"suggestion":"review"}],"offset":10010,"suggestion":"review"}],"suggestion":"review"},"terror":{"cuts":[{"details":[{"label":"normal","score":0.94821,"suggestion":"pass"}],"offset":0,"suggestion":"pass"},{"details":[{"label":"normal","score":0.99809,"suggestion":"pass"}],"offset":5005,"suggestion":"pass"},{"details":[{"label":"normal","score":0.96745,"suggestion":"pass"}],"offset":10010,"suggestion":"pass"}],"suggestion":"pass"}}}},"created_at":"2020-05-15T14:34:06.361+08:00","updated_at":"2020-05-15T14:34:12.054+08:00","rescheduled_at":"2020-05-15T14:34:06.361+08:00"}
      : {"id":"5ebe37de3d07ee0007d4db61","request":{"data":{"uri":"https://dn-mars-assets.qbox.me/Fi1UC6waXtXYCpnTGHa8XxIziGNk"},"params":{"sync":false,"scenes":["pulp","terror","politician","ads"]}},"status":"DOING","created_at":"2020-05-15T14:34:06.361+08:00","updated_at":"2020-05-15T14:34:08.54+08:00","rescheduled_at":"2020-05-15T14:34:06.361+08:00"}
    )
    /* eslint-enable */
  }
  return get(`${apiPrefix}/jobs/video/${jobId}`)
}

// 设定最大次数的轮询
const pollInterval = 1000
const maxRetry = 20

export async function videoCensor(options: CreateVideoJobOptions) {
  const jobId = (await createVideoJob(options)).job_id

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
