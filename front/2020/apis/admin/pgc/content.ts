/**
 * @file 内容站
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { get } from 'utils/fetch'
import { ContentId, ContentType, ContentDetail } from 'constants/pgc/content'
import { mongoApiPrefix, handleResponseData } from '..'

interface ContentDetailWithTime extends ContentDetail {
  createdAt: number
  updatedAt: number
}

interface Content {
  id: ContentId
  type: ContentType // 种类
  draft: ContentDetailWithTime
  release?: ContentDetailWithTime // 每次刚发布的时候，release 的内容会跟 draft 相同（createdAt 除外）
}

export interface ListOptions {
  limit?: number
  offset?: number
}

interface ListOriginalResult {
  count: number
  data: Array<Required<Content>> | null
}

export interface ListResult {
  count: number
  data: Array<Required<Content>>
}

export async function listReleasedContent(options: ListOptions) {
  const key = 'release.createdAt'
  const query = {
    sort: `-${key}`, // TODO: 规则需要细化
    query: JSON.stringify({ [key]: { $gt: 0 } }),
    ...options
  }
  const result: ListOriginalResult = await get(`${mongoApiPrefix}/pgc-content`, query)
  return {
    ...result,
    data: handleResponseData(result)
  }
}

export function getContent(id: ContentId): Promise<Content> {
  return get(`${mongoApiPrefix}/pgc-content/${id}`)
}
