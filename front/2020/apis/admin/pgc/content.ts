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
}

export interface ListOptions extends BaseListOptions {
  limit: number
  offset?: number
}

function getListParams<T extends BaseListOptions>({ type, category, ...baseOptions }: T) {
  const prefix = 'release'
  const options = {
    sort: `-${prefix}.createdAt`,
    query: {
      ...(type && { type }),
      ...(category && { [`${prefix}.category`]: category }),
      [prefix]: { $ne: null }
    },
    ...baseOptions
  }
  return options
}

export async function listReleasedContent(options: ListOptions) {
  return list<ReleasedContent>(resource, getListParams(options))
}

export async function listAllReleasedContent(options: BaseListOptions = {}) {
  return listAll<ReleasedContent>(resource, getListParams(options))
}

export function getContent(id: ContentId) {
  return get<Content>(resource, id)
}
