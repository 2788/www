import { post } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'

/**
 * @file 语音合成 tts 相关 API
 * @description 接口文档 https://developer.qiniu.com/dora/8091/speech-synthesis
 */

const ttsApi = `${basePrefix}/ap-gate-z0`

export type TtsResponse = {
  voice_id: string
  err_code: number
  err_msg: string
  audio: string
}

export type TtsOptipns = {
  text: string
  speaker?: string
  volume?: number
  speed?: number
  voiceId?: string
  audioEncoding?: number
  sampleRate?: number
}

export async function getTts(options: TtsOptipns): Promise<TtsResponse> {
  const response: TtsResponse = await post(`${ttsApi}/voice/tts`, options)
  if (response.err_code !== 0 || !response.audio) {
    throw new Error(response.err_msg)
  }
  return response
}
