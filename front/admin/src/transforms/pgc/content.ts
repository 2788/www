/**
 * @file 内容站 - 内容管理
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import moment from 'moment'

import { wwwHost } from 'constants/env'
import { pgcRoute, pgcManageRoute, pgcManageAddRoute, pgcManageEditRoute } from 'constants/route'
import {
  wwwContentDetailUrlPrefix, uploadBucketKeyPrefix, ContentId, ContentType, Content
} from 'constants/pgc/content'

export function getListPageUrl(): string {
  return `${pgcRoute}${pgcManageRoute}`
}

export function getAddPageUrl(type: ContentType): string {
  return `${pgcRoute}${pgcManageRoute}${pgcManageAddRoute}?type=${type}`
}

export function getEditPageUrl(id: ContentId): string {
  return `${pgcRoute}${pgcManageRoute}${pgcManageEditRoute}?id=${id}`
}

export function getWwwContentDetailUrl(id: ContentId): string {
  return `${wwwHost}/${wwwContentDetailUrlPrefix}/${id}`
}

export function getWwwContentDetailEmbedMarkdown(id: ContentId): string {
  return `\n----\n${getWwwContentDetailUrl(id)}\n\n---\n` // 针对 vditor 解析规则优化 FIXME: 插在第一行还是会有点奇怪…
}

export function getWwwContentDetailPreviewUrl(): string {
  return `${wwwHost}/${wwwContentDetailUrlPrefix}/preview`
}

export function generateUploadBucketKey(fileName: string, timestamp = moment().unix()): string {
  return `${uploadBucketKeyPrefix}/${timestamp}/${fileName}`
}

/** has released without edit (draft) */
export function isUpToDate(content: Content): boolean {
  return content.release?.updatedAt === content.draft.updatedAt
}
