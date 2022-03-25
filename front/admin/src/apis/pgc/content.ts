/**
 * @file 内容站 - 内容管理
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: 记录 creator、editor、publisher 等人的信息？

import { injectable } from 'qn-fe-core/di'
import { BaseClient } from 'admin-base/common/apis/base'

import { generateUuidId } from 'utils/uuid'
import { timeFormatterNum } from 'utils/time'
import { ReplaceValue } from 'utils/ts'
import { apiMongo } from 'constants/api-prefix'
import { ContentId, ContentType, ContentDetail, ContentDetailWithTime, Content } from 'constants/pgc/conetnt'

// FIXME: 试了一下，类型是对的，但是编译会溢出，有空研究一下
// type QueryKeyType = (keyof Content) | `${'draft' | 'release'}.${keyof ContentDetailWithTime}`

export interface ListOptions {
  limit?: number
  offset?: number
  sort?: string // `${'+' | '-'}${QueryKeyType}`
}

export interface ListResult {
  count: number
  data: Content[]
}

const prefix = `${apiMongo}/pgc-content`

@injectable()
export default class PgcContentApis {

  constructor(private client: BaseClient) { }

  add(type: ContentType, contentDetail: ContentDetail, needRelease: boolean) {
    const time = timeFormatterNum()
    const contentDetailWithTime: ContentDetailWithTime = {
      ...contentDetail,
      createdAt: time,
      updatedAt: time
    }
    const content: Content = {
      id: generateUuidId(), // TODO: 咋生成自增 id… 有点不友好
      type,
      draft: contentDetailWithTime,
      ...(needRelease && {
        release: contentDetailWithTime
      })
    }
    return this.client.post<Content>(prefix, content)
  }

  update(originalContent: Content, contentDetail: Partial<ContentDetail>, needRelease: boolean) {
    const time = timeFormatterNum()
    const contentDetailWithTime: ContentDetailWithTime = {
      ...originalContent.draft,
      ...contentDetail,
      updatedAt: time
    }
    const content: Partial<Content> = {
      draft: contentDetailWithTime,
      ...(needRelease && {
        release: {
          ...contentDetailWithTime,
          createdAt: originalContent.release?.createdAt ?? time
        }
      })
    }
    return this.client.patch<Content>(`${prefix}/${originalContent.id}`, content)
  }

  delete(id: ContentId) {
    return this.client.delete<void>(`${prefix}/${id}`)
  }

  get(id: ContentId) {
    return this.client.get<Content>(`${prefix}/${id}`)
  }

  async list(
    query?: Record<string, any>, // Record<`${QueryKeyType}`, any>
    listOptopns?: ListOptions
  ): Promise<ListResult> {
    const options: ListOptions & { query?: string } = {
      sort: '-draft.updatedAt',
      ...listOptopns,
      ...(query && { query: JSON.stringify(query) })
    }
    type Result = ReplaceValue<ListResult, { data: ListResult['data'] | null }>
    const result = await this.client.get<Result>(prefix, options)
    return {
      ...result,
      data: result.data ?? []
    }
  }
}
