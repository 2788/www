/**
 * @file routes
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { pgcContentMdEmbedHost, host } from 'constants/env'
import { ContentId, ContentType, ContentCategory, contentDetailEmbedUrlPrefix } from 'constants/pgc/content'

export function isContentDetailUrl(url: string): boolean {
  return url.trim().indexOf(`${pgcContentMdEmbedHost}/${contentDetailEmbedUrlPrefix}/`) === 0
}

export function getIdFromContentDetailUrl(url: string): string {
  return url.trim().replace(`${pgcContentMdEmbedHost}/${contentDetailEmbedUrlPrefix}/`, '').replace(/[/?#].*/, '')
}

export function getContentDetailUrl(id: ContentId, isFull = false): string {
  return `${isFull ? host : ''}/${contentDetailEmbedUrlPrefix}/${id}`
}

export function getIndexUrl() {
  return '/pgc'
}

export function getListIndexUrl() {
  return '/pgc/list'
}

export function getListUrl(type: ContentType, category: ContentCategory | null) {
  return `${getListIndexUrl()}/${type}/${category ?? 'all'}`
}

