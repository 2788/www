import { get } from 'utils/fetch'
import { apiPrefix, getFilteredList, sortByOrder, handleResponseData } from '.'

export type Banner = {
  name: string
  pcImg: string
  mobileImg: string
  effectTime: number
  invalidTime: number
  createTime: number
  editTime: number
  backgroundColor: string,
  link: string
  order: number
}

// 获取首页 banners
export function getBanners(): Promise<Banner[]> {
  return get(apiPrefix + '/www-homepage-banner')
    .then(res => sortByOrder(getFilteredList(handleResponseData(res))))
}

export type Activity = {
  title: string
  subTitle: string
  icon: string
  effectTime: number
  invalidTime: number
  createTime: number
  editTime: number
  label: string,
  link: string
  order: number
}

// 获取首页广告位
export function getActivities(): Promise<Activity[]> {
  return get(apiPrefix + '/www-homepage-activity')
    .then(res => sortByOrder(getFilteredList(handleResponseData(res))))
}

export type NewsType = {
  order: number
  articleId: string
  title: string
  summary: string
  banner: string
  link: string
  editTime: number // 资讯记录修改时间
  createTime: string // 博客文章的创建时间
}

// 获取首页七牛资讯
export function getNews(): Promise<NewsType[]> {
  return get(apiPrefix + '/www-homepage-news')
    .then(res => sortByOrder((handleResponseData(res))))
}
