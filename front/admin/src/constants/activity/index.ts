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

/** 活动的短信通知模板 * */
export const ACTIVITY_REMINDER_SMS_TEMPLATE = '尊敬的嘉宾，您报名的 “[[.Title]]” 将于 [[.StartTime]] 开始！链接为您的签到二维码，请妥善保存。[[.Link]]'
export const ACTIVITY_REG_SUCCEED_SMS_TEMPLATE = '尊敬的嘉宾：您已成功报名 [[.StartTime]] “[[.Title]]” ！期待您的莅临！链接为您的签到二维码，请妥善保存。[[.Link]]'

/** 活动的短信通知模板内置key * */
export const activityNotificationTemplateAllowVars = [
  '.Title',
  '.StartTime',
  '.Link'
]
