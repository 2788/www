// 市场活动常量
export enum StateType {
  Draft,
  Release
}

export const stateMap = {
  [StateType.Draft]: '草稿',
  [StateType.Release]: '发布'
} as { [k in StateType]: string }

export const dateFormat = 'YYYY-MM-DD HH:mm'
export const timeFormat = 'HH:mm'

/** 官网活动方案页 url 前缀 */
export const wwwActivityPathPrefix = '/activity/'
