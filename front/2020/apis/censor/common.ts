import { apiHost } from 'constants/api'
import { censorScenes } from 'constants/env'

export const apiPrefix = `${apiHost}/ai`

// 接口文档说视频没有 ads，但是实际返回也有 ads...
export type Scene = 'ads' | 'pulp' | 'terror' | 'politician'

// 默认带的审查参数，注意 censor 测试环境没有广告服务，这里通过环境变量控制
export const scenes = censorScenes.split(',') as Scene[]
export const defaultParams = { scenes }

export type Suggestion = 'block' | 'review' | 'pass'

export type Pts = number[][]

export type Detection = {
  pts: Pts
  score: number
  comments?: string[]
}

export type Sample = {
  uri: string
  pts: Pts
}

export type SceneResultDetail = {
  suggestion: Suggestion
  label: string
  score: number
  group?: string
  detections?: Detection[]
  sample?: Sample
}

export const failedMsg = '任务失败，请稍后重试'

// 图片/视频地址可能是以 `/` 开头的路径，这里转为为完整 URL 以方便接口处理
export function getFullUrl(url: string) {
  const { protocol, host } = window.location
  // 本地开发的时候，图片是本地地址，没法发给 censor 处理，这里替换为测试环境对应的地址
  const realHost = /^localhost/.test(host) ? 'www-2020.qiniu.io' : host
  return (
    url[0] === '/'
    ? `${protocol}//${realHost}${url}`
    : url
  )
}
