/**
 * @file 内容站 - 首页轮播图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { pgcRoute, pgcBannerRoute } from 'constants/route'

export function getListPageUrl(): string {
  return `${pgcRoute}${pgcBannerRoute}`
}
