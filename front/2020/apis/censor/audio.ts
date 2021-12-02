/**
 * @file 音频内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/censor/8061/audio-censor
 */

import { timeout } from 'utils'
import { post, get } from 'utils/fetch'
import { Options, ResultWrapper, Params, Result } from './censor-types'
import { failedMsg, getFullUrl, apiPrefix } from './common'

export const defaultAudioParams: Params = {
  scenes: ['antispam']
}

export type CreateAudioJobRes = {
  /** 请求唯一标识 可用来查询异步审核任务情况 */
  id: string
}

export type GetAudioJobRes = {
  id: string
  status: 'WAITING' | 'DOING' | 'FINISHED' | 'FAILED'
  request: any
  result: ResultWrapper
  error: string
  created_at: string
  updated_at: string
}

export async function getAudioJob(id: string): Promise<GetAudioJobRes> {
  return get(`${apiPrefix}/v3/jobs/audio/${id}`)
}

export async function createAudioJob(options: Options): Promise<CreateAudioJobRes> {
  options.data.uri = getFullUrl(options.data.uri)
  return post(`${apiPrefix}/v3/audio/censor`, options)
}

// 设定最大次数的轮询
const pollInterval = 1000
const maxRetry = 30

export async function audioCensor(options: Options): Promise<Result> {
  const id = (await createAudioJob(options)).id
  let shouldRetry = maxRetry
  while (shouldRetry--) {
    // eslint-disable-next-line no-await-in-loop
    await timeout(pollInterval)
    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await getAudioJob(id)
      switch (res.status) {
        case 'FINISHED':
          if (res.result && res.result.code === 200) {
            return res.result.result
          }
          throw new Error(failedMsg)
        case 'FAILED':
          throw new Error(failedMsg)
        default:
          break
      }
    } catch {
      throw new Error(failedMsg)
    }
  }

  throw new Error('等待超时，请稍后再试')
}
