/**
 * @file 日期、时间工具
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import dayjs from 'dayjs'

export function formateDate(unixTimestamp: number) { // 单位：秒
  const target = dayjs(unixTimestamp * 1e3)
  const now = dayjs()

  if (!target.isSame(now, 'year')) {
    return target.format('YYYY年M月D日')
  }

  if (!(
    target.isSame(now, 'month')
    && target.isSame(now, 'date')
  )) {
    return target.format('M月D日')
  }

  return target.format('HH时mm分')
}
