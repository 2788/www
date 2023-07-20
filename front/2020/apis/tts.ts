import { post } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'

/**
 * @file 语音合成 tts 相关 API
 * @description 接口文档 https://developer.qiniu.com/dora/8091/speech-synthesis
 */

const ttsApi = `${basePrefix}/ap-gate-z0`

type Result = {
  audioUrl: string
}

export type TtsResponse = {
  code: string
  msg: string
  result: Result
}

export type TtsOptipns = {
  content: string
  spkid?: number
  audioType?: number
  speed?: number
  volume?: number
}

export async function getTts(options: TtsOptipns): Promise<TtsResponse> {
  const response: TtsResponse = await post(`${ttsApi}/voice/v2/tts`, options)
  if (response.code !== '0' || !response.result.audioUrl) {
    throw new Error(response.msg)
  }
  return response
}
