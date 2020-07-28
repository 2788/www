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
export function getBanners(): Promise<Banner[]> {
  return get(apiPrefix + '/banners-online', { location: 'BANNER_LOCATION_WWW', page: 1, page_size: 10 }).then(res => res.data.banners)
}
