/**
 * @file 搜索相关接口
 * @description 接口文档 https://cf.qiniu.io/pages/viewpage.action?pageId=43394609
 */

import { endsWith } from 'lodash'
import { siteNameForSearch as site } from 'constants/env'
import { apiPrefix as basePrefix } from 'constants/api'
import { titleSuffix } from 'constants/page'
import { timeout } from 'utils'
import { get } from 'utils/fetch'

const apiPrefix = `${basePrefix}/search`

export enum Tag {
  Product = 'products',
  Solution = 'solutions',
  Other = 'others'
}

export enum SearchIn {
  Title = 'title'
}

export type SearchParams = {
  /** 搜索关键词，必传 */
  keyword: string
  /** 标签，取值同配置中配的值，如 product / solution / other，不传即为所有 */
  tag?: Tag | null
  /**
   * 关键词的搜索范围，不传则表示同时在标题 & 正文中搜索；可选值：
   * - title：表示仅搜索标题包含关键词的内容
   */
  in?: SearchIn
  /** 搜索结果的起始位置，不传默认为 0 */
  from?: number
  /** 搜索结果项的数量，不传默认为 10 */
  limit?: number
}

export type SearchResultItem = {
  title: string     // 标题
  matched?: string[] // 匹配了关键词的内容（含高亮标签）
  description: string
  keywords: string
  url: string       // 结果对应的页面 URL
  tag: Tag          // 该页面的标签
}

export type SearchResult = {
  total: number             // 搜索结果的总数
  items: SearchResultItem[] // 搜索结果列表
}

/** 搜索 */
export async function search({ keyword, ...otherParams }: SearchParams): Promise<SearchResult> {
  return get(`${apiPrefix}/search`, { site, term: keyword, ...otherParams })
}

export type CountByTagsParams = {
  keyword: string
  tags: Array<Tag | null>
}

export function countByTags({ keyword, tags }: CountByTagsParams): Promise<number[]> {
  return Promise.all(tags.map(async tag => {
    try {
      const searched = await search({ keyword, tag, from: 0, limit: 0 })
      return searched.total
    } catch {
      return 0
    }
  }))
}

export type HotResult = {
  items: string[] // 热门搜索词列表
}

export type HotKeywordsResult = string[]

/** 获取热门搜索词列表 */
export async function getHotKeywords(): Promise<HotKeywordsResult> {
  if (typeof window === 'undefined') {
    await timeout(300)
    return ['对象存储', '直播', '音视频']
  }
  const result: HotResult = await get(`${apiPrefix}/hot`, { site })
  return result.items
}

/** 获取联想词 */
export async function getSuggestions(keyword: string) {
  const searched = await search({ keyword, in: SearchIn.Title, limit: 5 })
  return searched.items.map(item => {
    let suggestion = stripTag(item.title)
    if (endsWith(suggestion, titleSuffix)) {
      suggestion = suggestion.slice(0, -titleSuffix.length)
    }
    return suggestion
  })
}

// 移除文本内容中的 HTML 标签
// `foo<p>bar</p>` -> `foobar`
function stripTag(htmlText: string) {
  return htmlText.replace(/<(.|\n)*?>/g, '')
}
