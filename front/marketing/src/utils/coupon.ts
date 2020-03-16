/**
 * @file coupon utils
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import moment from 'moment'

import { ValueOf } from 'types/ts'

import { asYuan } from './money'
import { couponTimePeriodType } from 'constants/coupon'

export function getDerateRule(threshold: number): string {
  const numThreshold: number = parseFloat(asYuan(threshold).toFixed(2))
  if (numThreshold > 0) {
    return (`满 ${numThreshold} 元可用`).trim()
  }
  return '无门槛'
}

export function getValidDuration(
  type: ValueOf<typeof couponTimePeriodType>,
  effectDays: string,
  effectTime: string,
  deadTime: string
): string {
  switch (type) {
    case couponTimePeriodType.CONST_DURATION:
      return (`自领取日起，${effectDays} 天有效`).trim()
    case couponTimePeriodType.ABSOLUTE:
      const TIME_LAYOUT: string = 'YYYY-MM-DD HH:mm:ss'
      return (`
        ${moment(effectTime).utcOffset(8).format(TIME_LAYOUT)} ~
        ${moment(deadTime).utcOffset(8).format(TIME_LAYOUT)} 有效
      `).trim()
    default:
      return ''
  }
}
