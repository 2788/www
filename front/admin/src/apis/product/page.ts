import { injectable } from 'qn-fe-core/di'
import { BaseClient } from 'admin-base/common/apis/base'

import { apiMongo } from 'constants/api-prefix'

export interface IPage {
  id: string
  name: string
  link: string
}

@injectable()
export default class PageApis {

  constructor(private client: BaseClient) { }

  add(options: IPage): Promise<void> {
    return this.client.post(apiMongo + '/www-product-page', options)
  }

  update(options: IPage): Promise<void> {
    return this.client.put(apiMongo + '/www-product-page/' + options.id, options)
  }

  delete(id: string): Promise<void> {
    return this.client.delete(apiMongo + '/www-product-page/' + id)
  }

  list(): Promise<IPage[]> {
    return this.client.get<any>(apiMongo + '/www-product-page').then(res => res.data || [])
  }
}
