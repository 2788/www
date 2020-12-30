export enum Activity {
  Main = 'main',
  Page = 'page',
  Detail = 'detail'
}

export const urlMap = {
  [Activity.Main]: '/activity',
  [Activity.Page]: '/activity/page',
  [Activity.Detail]: '/activity/detail'
}

export const pageSize = 5 // 每页 5 条

export enum ProgressState {
  Start = '活动即将开始',
  Mid = '活动进行中',
  End = '活动已结束'
}

export const locationMap = {
  online: '线上'
} as { [k: string]: string }
