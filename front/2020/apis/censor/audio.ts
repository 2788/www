/**
 * @file 音频内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/dora/7757/number-of-audio-files-to-review
 */

import { timeout } from 'utils'
import { post } from 'utils/fetch'
import { censorOpenApiPrefix, failedMsg, getFullUrl } from './common'

export { defaultParams } from './common'

export type CreateAudioJobRes = {
  code: number
  message: string
  /** 请求唯一标识 可用来查询异步审核任务情况 */
  entryId: string
}

export type CreateAudioJobOptions = {
  /** 需要识别的违规类型
   *  POLITICAL:涉政识别 ANTHEN:国歌识别
   *  PORN:色情识别
   *  AD:广告识别
   *  MOAN:娇喘识别
   *  GENDER:性别识别
   *  TIMBRE:音色标签(需要同时传入GENDER才能生效)
   *  SING: 唱歌识别
   *  DEFAULT: 默认取值
   */
  type: string
  data: {
    /** 待识别音频url地址 */
    url: string
    audioName?: string
    tokenId?: string
    channel?: string
    returnAllText?: boolean
    nickName?: string
    timestamp?: number
    room?: string
  },
  /** 异步检测结果回调 */
  callback?: string
}

export type GetAudioJobOptions = {
  entryId: string
}

export type GetAudioJobDetail = {
  audioStarttime: number
  audioEndtime: number
  audioUrl: string
  audioText: string
  riskLevel: 'REJECT' | 'REVIEW' | 'PASS'
  /**
   * 风险类型，可能取值:
   * 0:正常
   * 100:涉政
   * 120:国歌
   * 200:色情
   * 210:辱骂
   * 250:娇喘
   * 300:广告
   * 700:黑名单
   * 900:自定义
   */
  riskType?: 0 | 100 | 200 | 210 | 300 | 310 | 320 | 400 | 500 | 510 | 520 | 700 | 710 | 800 | 900
  audioMatchedItem?: string
  description: string
}

export type GetAudioJobRes = {
  code: number
  message: string
  entryid: string
  /** 音频转译文本结果 */
  audioText: string
  /** 整段音频的音频时长，单位秒 */
  audioTime?: number
  /** 音频片段风险原因汇总 */
  labels?: string
  riskLevel?: string
  detail?: GetAudioJobDetail[]
  gender?: {
    label: string
    confidence: number
  }
  /** 表示该条音频文件是否唱歌，0表示没有唱歌，1表示唱歌 */
  isSing?: number
  language?: {
    label: string
    confidence: number
  }
  tags?: Array<{
    label: string
    confidence: number
  }>
  callbackParam?: object
}

export async function getAudioJob(options: GetAudioJobOptions): Promise<GetAudioJobRes> {
  const response: GetAudioJobRes = await post(`${censorOpenApiPrefix}/anti_fraud/v2/query_audio`, options)
  return response
}

export async function createAudioJob(options: CreateAudioJobOptions): Promise<CreateAudioJobRes> {
  options.data.url = getFullUrl(options.data.url)
  const response: CreateAudioJobRes = await post(`${censorOpenApiPrefix}/anti_fraud/v2/audio`, options)
  if (response.code !== 1100) {
    throw new Error(failedMsg)
  }
  return response
}

// 设定最大次数的轮询
const pollInterval = 1000
const maxRetry = 30

export async function audioCensor(options: CreateAudioJobOptions): Promise<GetAudioJobRes> {
  const entryId = (await createAudioJob(options)).entryId
  let shouldRetry = maxRetry
  while (shouldRetry--) {
    // eslint-disable-next-line no-await-in-loop
    await timeout(pollInterval)
    let res
    try {
      // eslint-disable-next-line no-await-in-loop
      res = await getAudioJob({ entryId })
    } catch {
      throw new Error(failedMsg)
    }
    if (res.code === 1100) {
      if (res.audioTime) {
        return res
      }
    } else {
      throw new Error(failedMsg)
    }
  }

  throw new Error('等待超时，请稍后再试')
}
