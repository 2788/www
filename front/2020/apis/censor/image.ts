/**
 * @file 内容审核相关 API
 * @description 接口文档 https://developer.qiniu.com/censor/api/5588/image-censor
 */

import { post } from 'utils/fetch'
import {
  Suggestion,
  Scene,
  SceneResultDetail,
  apiPrefix,
  censorOpenApiPrefix,
  failedMsg,
  getFullUrl
} from './common'

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

export type ImageOpenCensorOptions = {
  /**
   * 选择识别类型，可选值:
   * POLITICS:涉政识别
   * PORN:色情识别
   * OCR:图片中的OCR文字识别
   * AD:广告识别
   * LOGO:视频水印logo识别
   * BEHAVIOR:不良场景识别，支持识别吸烟、喝酒、赌博、吸毒、避孕套和无意义画面
   */
  type: string
  data: {
    /** 要检测的图片，使用图片的url链接 */
    img: string
    tokenId?: string
    channel?: string
    registerTime?: number
    friendNum?: number
    fansNum?: number
    isPremiumUser?: number
    ip?: string
    receiveTokenId?: string
    sex?: number
    age?: number
    level?: number
    role?: string
    topic?: string
    phone?: string
    deviceId?: string
    imeimac?: string
    idfvidfa?: string
    maxFrame?: number
    interval?: number
  }
}

export type ImageOpenCensorRes = {
  code: number
  /** 取值范围[0,1000]，分数越高风险越大 */
  score?: number
  message: string
  status: 0 | 501
  /** 请求唯一标识，后续可用于数据查询 */
  entryId: string
  /** PASS:正常内容 REVIEW:可疑内容，建议人工审核, REJECT:违规内容，建议直接拦截 */
  riskLevel: 'REJECT'| 'REVIEW' | 'PASS'
  detail?: {
    /** 拦截的风险原因解释 */
    description: string
    /** 新版策略规则风险原因描述 */
    descriptionV2: string
    /** 策略规则标识，用来标识命中的策略规则 */
    model: string
    /** 标识风险类型 */
    riskType: 0 | 100 | 200 | 210 | 300 | 310 | 320 | 400 | 500 | 510 | 520 | 700 | 710 | 800 | 900
  }
}

// 参考 open-api 数美图片审核 https://developer.qiniu.com/dora/7758/several-beautiful-photos-review
export async function imageOpenCensor(options: ImageOpenCensorOptions): Promise<ImageOpenCensorRes> {
  const response: ImageOpenCensorRes = await post(`${censorOpenApiPrefix}/anti_fraud/v2/img`, options)
  if (response.code !== 1100) {
    throw new Error(failedMsg)
  }
  return response
}

