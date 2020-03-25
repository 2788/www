/**
 * @file coupon utils
 * @author yanxiaosong <yanxiaosong@qiniu.com>
 */

import moment from 'moment'

import { ValueOf } from '../types/ts'

import { couponTimePeriodType } from '../constants/coupon'
import { asYuan } from './money'

export function getDerateRule(threshold: number): string {
  const numThreshold: number = parseFloat(asYuan(threshold).toFixed(2))
  if (numThreshold > 0) {
    return `满 ${numThreshold} 元可用`
  }
  return '无门槛'
}

export function getValidDuration(
  type: ValueOf<typeof couponTimePeriodType>,
  effectDays: string,
  effectTime: string,
  deadTime: string
): string {
  const TIME_LAYOUT: string = 'YYYY-MM-DD HH:mm:ss'
  switch (type) {
    case couponTimePeriodType.FIXED_DAYS:
      return `自领取日起，${effectDays} 天有效`
    case couponTimePeriodType.FIXED_PERIOD:
      return (`
        ${moment(effectTime).utcOffset(8).format(TIME_LAYOUT)} ~
        ${moment(deadTime).utcOffset(8).format(TIME_LAYOUT)} 有效
      `).trim()
    default:
      return ''
  }
}
