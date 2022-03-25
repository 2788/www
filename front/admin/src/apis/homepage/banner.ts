import moment from 'moment'
import { injectable } from 'qn-fe-core/di'
import { BaseClient } from 'admin-base/common/apis/base'

import { apiMongo } from 'constants/api-prefix'

export interface IBanner {
  name: string
  pcImg: string
  mobileImg: string
  effectTime: number
  invalidTime: number
  createTime: number
  editTime: number
  backgroundColor: string,
  link: string
  order: number
}

@injectable()
export default class BannerApis {

  constructor(private client: BaseClient) { }

  add(options: IBanner): Promise<void> {
    options = { ...options, ...{ createTime: moment().unix(), editTime: moment().unix() } }
    return this.client.post(apiMongo + '/www-homepage-banner', options)
  }

  update(options: IBanner): Promise<void> {
    options = { ...options, editTime: moment().unix() }
    return this.client.put(apiMongo + '/www-homepage-banner/' + options.name, options)
  }

  delete(name: string): Promise<void> {
    return this.client.delete(apiMongo + '/www-homepage-banner/' + name)
  }

  list(): Promise<IBanner[]> {
    return this.client.get<any>(apiMongo + '/www-homepage-banner', { sort: '-editTime' }).then(res => res.data || [])
  }
}
