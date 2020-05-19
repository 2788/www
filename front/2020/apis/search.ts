/**
 * @file 搜索相关接口
 * @description 接口文档 https://cf.qiniu.io/pages/viewpage.action?pageId=43394609
 */

import { siteNameForSearch as site } from 'constants/env'
import { apiHost } from 'constants/api'
import { timeout } from 'utils'
import { get } from 'utils/fetch'

const apiPrefix = `${apiHost}/search`

export enum Tag {
  Product = 'product',
  Solution = 'solution',
  Other = 'other'
}

export enum SearchIn {
  Title = 'title'
}

export type SearchParams = {
  keyword: string
  tag?: Tag | null
  in?: SearchIn
  from?: number
  limit?: number
}

export type SearchResultItem = {
  title: string     // 标题
  matched: string[] // 匹配了关键词的内容（含高亮标签）
  url: string       // 结果对应的页面 URL
  tag: Tag          // 该页面的标签
}

export type SearchResult = {
  total: number             // 搜索结果的总数
  items: SearchResultItem[] // 搜索结果列表
}

/** 搜索 */
export async function search({ keyword, tag, from, limit }: SearchParams): Promise<SearchResult> {
  // mock API
  if (typeof window !== 'undefined') {
    await timeout(300)
    if (keyword.indexOf('空') >= 0) {
      return { total: 0, items: [] }
    }
    return {
      total: 24,
      items: new Array(limit).fill({
        title: '七牛云 - 校园招聘',
        url: 'https://www.qiniu.com/hire-campus.html',
        tag: Tag.Product,
        matched: [
          '七牛云-校园<em>招聘</em>首页校招流程<em>招聘</em>消息站<em>招聘</em>职位七牛云简介创始人介绍牛棚福利牛棚多彩生活更多牛棚多彩生活登录社会<em>招聘</em>校招流程校招直播宣讲会-许式伟的坦白局时间：2020年3月31日19：00直播链接：https',
          '-内推获取通道：1.七牛的学长学姐（包含实习生）获取内推二维码或链接2.关注【七牛<em>招聘</em>】公众号，通过空中宣讲会3.七牛校园大使校招安排-笔试具体时间及安排，将在每批次简历投递结束后通过邮件和短信通知，请同学留意通知',
          '<em>招聘</em>消息站加入春招交流群，HR实时回答疑问关注七牛<em>招聘</em>公众号，了解实时动态<em>招聘</em>职位搜索职位市场实习生市场类上海市·浦东新区信息安全实习生职能类上海市·浦东新区运维实习生北京市·朝阳区前端开发实习生（杭州'
        ]
      }).map((item, i) => ({
        ...item,
        title: `${keyword}的${tag || '全部'}结果（${(from || 0) + i}）`
      }))
    }
  }
  return get(`${apiPrefix}/search`, { site, term: keyword, tag, from, limit })
}

export type CountByTagsParams = {
  keyword: string
  tags: Array<Tag | null>
}

export function countByTags({ keyword, tags }: CountByTagsParams): Promise<number[]> {
  return Promise.all(tags.map(async tag => {
    const searched = await search({ keyword, tag, from: 0, limit: 0 })
    return searched.total
  }))
}

export type HotResult = {
  items: string[] // 热门搜索词列表
}

export type HotKeywordsResult = string[]

/** 获取热门搜索词列表 */
export async function getHotKeywords(): Promise<HotKeywordsResult> {
  if (typeof window !== 'undefined') {
    await timeout(300)
    return ['对象存储', '直播', '音视频']
  }
  const result: HotResult = await get(`${apiPrefix}/hot`, { site })
  return result.items
}

/** 获取联想词 */
export async function getSuggestions(keyword: string) {
  // TODO: 好像需要专门的接口来做才行，因为这么着搜到的不一定每个标题都带关键词，不太符合“联想”的场景
  const searched = await search({ keyword, in: SearchIn.Title, limit: 5 })
  return searched.items.map(item => item.title)
}
