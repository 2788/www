import moment from 'moment'
import { injectable } from 'qn-fe-core/di'
import { BaseClient } from 'admin-base/common/apis/base'

import { apiMongo } from 'constants/api-prefix'

export interface IActivity {
  title: string
  subTitle: string
  icon: string
  effectTime: number
  invalidTime: number
  createTime: number
  editTime: number
  label: string,
  link: string
  order: number
}
export interface IActivityWithId extends IActivity {
  _id: string
}

@injectable()
export default class ActivityApis {

  constructor(private client: BaseClient) { }

  add(options: IActivity): Promise<void> {
    options = { ...options, ...{ createTime: moment().unix(), editTime: moment().unix() } }
    return this.client.post(apiMongo + '/www-homepage-activity', options)
  }

  update(options: IActivity, id: string): Promise<void> {
    options = { ...options, editTime: moment().unix() }
    return this.client.put(apiMongo + '/www-homepage-activity/' + id, options)
  }

  delete(id: string): Promise<void> {
    return this.client.delete(apiMongo + '/www-homepage-activity/' + id)
  }

  list(): Promise<IActivityWithId[]> {
    return this.client.get<any>(apiMongo + '/www-homepage-activity', { sort: '-editTime' }).then(res => res.data || [])
  }
}
