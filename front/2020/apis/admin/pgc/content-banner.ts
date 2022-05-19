/**
 * @file 内容站首页 banner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { Banner } from 'constants/pgc/content-banner'

import { listAll, getFilteredList } from '..'

const resource = 'pgc-content-banner'

export async function listBanners(): Promise<Banner[]> {
  const options = { sort: '+order,-effectTime,-updatedAt' }
  const allBanners = await listAll<Banner>(resource, options)
  const effectBanners = getFilteredList(allBanners)
  const banners: Banner[] = []
  effectBanners.forEach(banner => {
    const { order } = banner
    if (!banners[order]) {
      banners[order] = banner
    }
  })
  return banners.filter(Boolean)
}
