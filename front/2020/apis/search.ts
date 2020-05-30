/**
 * @file 搜索相关接口
 * @description 接口文档 https://cf.qiniu.io/pages/viewpage.action?pageId=43394609
 */

import { endsWith } from 'lodash'
import { siteNameForSearch as site } from 'constants/env'
import { apiHost } from 'constants/api'
import { titleSuffix } from 'constants/page'
import { timeout } from 'utils'
import { get } from 'utils/fetch'

const apiPrefix = `${apiHost}/search`

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
  matched: string[] // 匹配了关键词的内容（含高亮标签）
  url: string       // 结果对应的页面 URL
  tag: Tag          // 该页面的标签
}

export type SearchResult = {
  total: number             // 搜索结果的总数
  items: SearchResultItem[] // 搜索结果列表
}

/** 搜索 */
export async function search({ keyword, ...otherParams }: SearchParams): Promise<SearchResult> {
  // mock API
  if (typeof window === 'undefined') {
    await timeout(300)
    if (keyword.indexOf('空') >= 0) {
      return { total: 0, items: [] }
    }
    return {
      total: 24,
      items: new Array(otherParams.limit).fill({
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
        title: `${keyword}的${otherParams.tag || '全部'}结果（${(otherParams.from || 0) + i}）`
      }))
    }
  }
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
