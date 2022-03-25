/**
 * @file 内容站 - 内容管理
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import moment from 'moment'

import { pgcRoute, pgcManageRoute, pgcManageAddRoute, pgcManageEditRoute } from 'constants/route'
import { wwwContentDetailUrlPrefix, uploadBucketKeyPrefix, ContentId, ContentType, Content } from 'constants/pgc/conetnt'

export function getListPageUrl(): string {
  return `${pgcRoute}${pgcManageRoute}`
}

export function getAddPageUrl(type: ContentType): string {
  return `${pgcRoute}${pgcManageRoute}${pgcManageAddRoute}?type=${type}`
}

export function getEditPageUrl(id: ContentId): string {
  return `${pgcRoute}${pgcManageRoute}${pgcManageEditRoute}?id=${id}`
}

export function isWwwContentDetailUrl(url: string): boolean {
  return url.trim().indexOf(`${wwwContentDetailUrlPrefix}/`) === 0
}

export function getContentIdFromWwwContentDetailUrl(url: string): string {
  return url.trim().replace(`${wwwContentDetailUrlPrefix}/`, '').replace(/[/?#].*/, '')
}

export function getWwwContentDetailUrl(id: ContentId): string {
  return `${wwwContentDetailUrlPrefix}/${id}`
}

export function getWwwContentDetailEmbedMarkdown(id: ContentId): string {
  return `\n----\n${getWwwContentDetailUrl(id)}\n\n---\n` // 针对 vditor 解析规则优化 FIXME: 插在第一行还是会有点奇怪…
}

export function generateUploadBucketKey(fileName: string): string {
  return `${uploadBucketKeyPrefix}/${moment().unix()}/${fileName}`
}

/** has released without edit (draft) */
export function isUpToDate(content: Content): boolean {
  return content.release?.updatedAt === content.draft.updatedAt
}
