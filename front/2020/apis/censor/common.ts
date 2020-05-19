import { apiHost } from 'constants/api'

export const apiPrefix = `${apiHost}/censor`

// 接口文档说视频没有 ads，但是实际返回也有 ads...
export type Scene = 'ads' | 'pulp' | 'terror' | 'politician'

// 默认带的审查参数
export const scenes: Scene[] = ['pulp', 'terror', 'politician']
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
