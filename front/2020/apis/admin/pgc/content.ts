/**
 * @file 内容站
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { get } from 'utils/fetch'
import { ContentId, ContentType, ContentCategory, Content, ReleasedContent } from 'constants/pgc/content'

import { mongoApiPrefix, handleResponseData } from '..'

export interface ListOptions {
  type?: ContentType
  category?: ContentCategory
  limit: number
  offset?: number
}

interface ListOriginalResult {
  count: number
  data: ReleasedContent[] | null
}

export interface ListResult {
  count: number
  data: ReleasedContent[]
}

export async function listReleasedContent({ type, category, ...baseOptions }: ListOptions): Promise<ListResult> {
  const prefix = 'release'
  const query = {
    sort: `-${prefix}.createdAt`,
    query: JSON.stringify({
      ...(type && { type }),
      ...(category && { [`${prefix}.category`]: category }),
      [prefix]: { $ne: null }
    }),
    ...baseOptions
  }
  const result: ListOriginalResult = await get(`${mongoApiPrefix}/pgc-content`, query)
  return {
    ...result,
    data: handleResponseData(result)
  }
}

// TODO: 抽象出与具体业务无关的 list all 方法
export async function listAllReleasedContent(
  options?: Omit<ListOptions, 'offset' | 'limit'>
): Promise<ListResult['data']> {
  const maxLimit = 999
  const { count } = await listReleasedContent({ ...options, offset: 0, limit: 1 })
  const len = Math.ceil(count / maxLimit)
  const paramsList = Array.from(Array(len), (_, i) => ({ ...options, offset: i * maxLimit, limit: maxLimit }))
  const resultList = await Promise.all(paramsList.map(params => listReleasedContent(params)))
  const contents = ([] as ListResult['data']).concat(...resultList.map(result => result.data)) // flat
  return contents
}

export function getContent(id: ContentId): Promise<Content> {
  return get(`${mongoApiPrefix}/pgc-content/${id}`)
}
