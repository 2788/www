/**
 * @file 内容站
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ContentId, ContentType, ContentCategory, Content, ReleasedContent } from 'constants/pgc/content'

import { get, list, listAll } from '..'

const resource = 'pgc-content'

export interface BaseListOptions {
  type?: ContentType
  category?: ContentCategory
  /** 任意一个完全相同 */
  keywords?: string[]
  /** 首次发布晚于该时间，单位为秒 */
  after?: number
}

export interface ListOptions extends BaseListOptions {
  limit: number
  offset?: number
}

function getListParams<T extends BaseListOptions>({ type, category, keywords, after, ...baseOptions }: T) {
  const prefix = 'release'
  const options = {
    sort: `-${prefix}.createdAt`,
    query: {
      ...(type && { type }),
      ...(category && { [`${prefix}.category`]: category }),
      ...(keywords && { [`${prefix}.keywords`]: { $in: keywords } }),
      ...(after && { [`${prefix}.createdAt`]: { $gt: after } }),
      [prefix]: { $ne: null }
    },
    ...baseOptions
  }
  return options
}

export async function listReleasedContents(options: ListOptions) {
  return list<ReleasedContent>(resource, getListParams(options))
}

export async function listAllReleasedContents(options: BaseListOptions = {}) {
  return listAll<ReleasedContent>(resource, getListParams(options))
}

export function getContent(id: ContentId) {
  return get<Content>(resource, id)
}
