/**
 * @file yinxulai
 * @author yinxulai <yinxulai@qiniu.com>
 */

import { IActivity } from 'apis/activity/market'

export function hasActivityPage(info: IActivity): boolean {
  return Boolean(info.page != null && info.page.banner && info.page.sections.length > 0)
}
