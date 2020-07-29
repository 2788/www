import { get } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'

const apiPrefix = `${basePrefix}/lego`

export type Banner = {
  id: string
  color: string
  dead_at: string
  effect_at: string
  image_src: string
  link: string
  mobile_image_src: string
}

// 获取首页 banners
export function getBanners({ page_size }: { page_size: number }): Promise<Banner[]> {
  return get(apiPrefix + '/banners-online', { location: 'BANNER_LOCATION_WWW', page: 1, page_size }).then(res => res.data.banners)
}

export type Activity = {
  id: string
  effect_at: string
  dead_at: string
  title: string
  subtitle: string
  url: string
  // 角标颜色
  subscript_color: string
  // 角标文案
  subscript_text: string
}

// 获取首页广告位
export function getActivities({ page_size }: { page_size: number }): Promise<Activity[]> {
  return get(apiPrefix + '/adverts-online', { page: 1, page_size }).then(res => res.data.adverts)
}
