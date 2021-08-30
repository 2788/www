/**
 * @file 申诉
 */

export { meihuaUploadPrefix } from './env'

export type AppealId = number

export enum AppealType {
  Domain = 1,
  Account = 2,
  Url = 3
}

export enum AppealStatus {
  Revert = -2,
  Reject = -1,
  Pending = 0,
  Accept = 1
}

export const appealTypeTextMap: Record<AppealType, string> = {
  [AppealType.Domain]: '域名解封',
  [AppealType.Account]: '账号解冻',
  [AppealType.Url]: '解封链接'
}

export const appealStatusTextMap: Record<AppealStatus, string> = {
  [AppealStatus.Revert]: '撤销',
  [AppealStatus.Reject]: '拒绝',
  [AppealStatus.Pending]: '处理中',
  [AppealStatus.Accept]: '通过'
}
