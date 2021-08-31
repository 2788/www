/**
 * @file          CheckIn
 * @description   签到功能相关接口
 * @author        renpanpan
 */

import { get, post } from 'utils/fetch'
import { mongoApiPrefix, wwwApiPrefix } from '..'

export async function getIsScannerIdValid(scannerId: string): Promise<boolean> {
  const res: { endTime: number } = await get(`${mongoApiPrefix}/www-activity-check-in-qr-code-scanner/${scannerId}`, {})
  const nowTime = Math.floor(new Date().getTime() / 1000) // 取秒数
  return res.endTime > nowTime // 判断是否过了有效期
}

export function checkIn(registrationId: string): Promise<void> {
  return post(`${wwwApiPrefix}/activity-checkin`, { id: registrationId })
}
