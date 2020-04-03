/**
 * @file package utils
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import moment from 'moment'

import { ValueOf } from 'types/ts'
import { effectType } from 'constants/package'

export function splitStrByComma(origin: string): string[] {
  return origin ? origin.split(/,|，/).filter((item: string, _index: number) => !!item) : []
}

export function joinStrListByHyphen(origin: string[]): string {
  return (origin && origin.length && origin[0]) ? origin.join('-') : ''
}

export function getEffetTimeStrByType(type: ValueOf<typeof effectType>): string {
  const TIME_LAYOUT: string = 'YYYYMMDD'
  const firstDayOfCurrentMonth: moment.Moment = moment().utcOffset(8).startOf('month')

  switch (type) {
    case effectType.CURRENT_MONTH:
      return firstDayOfCurrentMonth.format(TIME_LAYOUT)
    case effectType.NEXT_MONTH:
      return firstDayOfCurrentMonth.add(1, 'months').format(TIME_LAYOUT)
    default:
      return firstDayOfCurrentMonth.format(TIME_LAYOUT)
  }
}
