/**
 * @file coupon utils
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import moment from 'moment'

import { asYuan } from './money'
import { couponTimePeriodType } from 'constants/coupon'

export function getDerateRule(threshold: any): string {
  const num_threshold: number = parseFloat(asYuan(threshold).toFixed(2))
  if (num_threshold > 0) {
    return `满 ${num_threshold} 元可用`
  }
  return '无门槛'
}

export function getValidDuration(
  type: string,
  effect_days: string,
  effect_time: string,
  dead_time: string
): string {
  switch (type) {
    case couponTimePeriodType.CONST_DURATION:
      return `自领取日起，${effect_days} 天有效`
    case couponTimePeriodType.ABSOLUTE:
      const TIME_LAYOUT: string = 'YYYY-MM-DD HH:mm:ss'
      return `
        ${moment(effect_time).utcOffset(8).format(TIME_LAYOUT)} ~
        ${moment(dead_time).utcOffset(8).format(TIME_LAYOUT)} 有效
      `
    default:
      return ''
  }
}
