import moment from 'moment'
import { injectable } from 'qn-fe-core/di'
import { BaseClient } from 'admin-base/common/apis/base'

import { apiMongo } from 'constants/api-prefix'

export interface INotice {
  product: string
  summary: string
  link: string
  type: string
  effectTime: number
  invalidTime: number
  createTime: number
  editTime: number
}

export interface INoticeWithId extends INotice {
  _id: string
}

@injectable()
export default class NoticeApis {

  constructor(private client: BaseClient) { }

  add(options: INotice): Promise<void> {
    options = { ...options, ...{ createTime: moment().unix(), editTime: moment().unix() } }
    return this.client.post(apiMongo + '/www-product-notice', options)
  }

  update(options: INotice, noticeId: string): Promise<void> {
    options = { ...options, editTime: moment().unix() }
    return this.client.put(apiMongo + '/www-product-notice/' + noticeId, options)
  }

  delete(noticeId: string): Promise<void> {
    return this.client.delete(apiMongo + '/www-product-notice/' + noticeId)
  }

  list(): Promise<INoticeWithId[]> {
    return this.client.get<any>(apiMongo + '/www-product-notice', { sort: '-editTime' }).then(res => res.data || [])
  }
}
