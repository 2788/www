/**
 * @file 验证
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: 把 error code 定义进来，然后删掉散落在各处的 code

import { post } from 'utils/fetch'
import { wwwApiPrefix } from '.'

export enum VerificationSmsOperation {
  ApplyActivity = 1, // 活动报名
  DownloadFile = 2,
  PlayVideo = 3
}

// 获取验证码
export function sendVerificationSms(phoneNumber: string, operation: VerificationSmsOperation): Promise<void> {
  const options = {
    phone_number: phoneNumber,
    operation
  }
  return post(wwwApiPrefix + '/verification/sms/send', options)
}

// 校验验证码
export function verifySms(captcha: string, phoneNumber: string, operation: VerificationSmsOperation): Promise<void> {
  const opts = {
    captcha,
    phone_number: phoneNumber,
    operation
  }
  return post(wwwApiPrefix + '/verification/sms/verify', opts)
}
