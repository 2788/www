/**
 * @file 内容站 - 内容管理
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: 记录 creator、editor、publisher 等人的信息？

import { injectable } from 'qn-fe-core/di'

import { ContentId, ContentType, ContentDetail, ContentDetailWithTime, Content } from 'constants/pgc/content'
import { RefreshOptions } from 'apis/base-client'
import { MongoApiBaseClient, generateStdInfo, ListBaseOptions } from 'apis/mongo-api-client'

const prefix = 'pgc-content'

function getRefreshPathsOptions(needRelease: boolean): RefreshOptions {
  return { wwwRefresh: needRelease ? ['/pgc'] : [] }
}

@injectable()
export default class PgcContentApis {
  constructor(private client: MongoApiBaseClient) {}

  add(type: ContentType, contentDetail: ContentDetail, needRelease: boolean) {
    const { createdAt, updatedAt, id } = generateStdInfo()
    const contentDetailWithTime: ContentDetailWithTime = {
      ...contentDetail,
      createdAt,
      updatedAt
    }
    const content: Content = {
      id,
      type,
      draft: contentDetailWithTime,
      ...(needRelease && {
        release: contentDetailWithTime
      })
    }
    return this.client.post<Content>(prefix, content, getRefreshPathsOptions(needRelease))
  }

  update(originalContent: Content, contentDetail: Partial<ContentDetail>, needRelease: boolean) {
    const { updatedAt } = generateStdInfo()
    const contentDetailWithTime: ContentDetailWithTime = {
      ...originalContent.draft,
      ...contentDetail,
      updatedAt
    }
    const content: Partial<Content> = {
      draft: contentDetailWithTime,
      ...(needRelease && {
        release: {
          ...contentDetailWithTime,
          createdAt: originalContent.release?.createdAt ?? updatedAt
        }
      })
    }
    return this.client.patch<Content>(
      `${prefix}/${originalContent.id}`,
      content,
      getRefreshPathsOptions(needRelease)
    )
  }

  delete(id: ContentId) {
    return this.client.delete<void>(`${prefix}/${id}`, getRefreshPathsOptions(true))
  }

  get(id: ContentId) {
    return this.client.get<Content>(`${prefix}/${id}`)
  }

  list(options: ListBaseOptions = {}) {
    options = {
      sort: '-draft.updatedAt',
      ...options
    }
    return this.client.list<Content>(prefix, options)
  }
}
