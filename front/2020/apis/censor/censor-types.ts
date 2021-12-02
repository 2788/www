/**
 * @file 七牛内容审核 API 通用类型定义
 * @description 不同的 API 类型会略有区别，如果需要使用这些有差异的字段，可以 extends 类型然后定义各个 API 具体的类型
 */

export type Suggestion = 'block' | 'review' | 'pass'

export type Scene = 'pulp' | 'terror' | 'politician' | 'ads' | 'behavior' | 'antispam'

export type UriData = {
  uri: string
}

export type TextData = {
  text: string
}

export type Params = {
  scenes: Scene[]
}

export type Options<T = UriData> = {
  data: T
  params: Params
}

export type SceneResult = {
  suggestion: Suggestion
}

export type ScenesResult = {
  [scene in Scene]?: SceneResult
}

export type Result = {
  suggestion: Suggestion
  scenes: ScenesResult
}

export type ResultWrapper<R = Result> = {
  code: number
  message: string
  result: R
}
