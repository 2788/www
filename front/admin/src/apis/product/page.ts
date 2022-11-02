import { injectable } from 'qn-fe-core/di'

import BaseClient, { RefreshOptions } from 'apis/base-client'
import { apiMongo } from 'constants/api-prefix'

export interface IPage {
  id: string
  name: string
  link: string
}

const refreshPathsOptions: RefreshOptions = { wwwRefresh: ['/product-news'] }

/** @deprecated TODO: use `ProductInfoApis` instead */
@injectable()
export default class PageApis {

  constructor(private client: BaseClient) { }

  add(options: IPage): Promise<void> {
    return this.client.post(apiMongo + '/www-product-page', options, refreshPathsOptions)
  }

  update(options: IPage): Promise<void> {
    return this.client.put(apiMongo + '/www-product-page/' + options.id, options, refreshPathsOptions)
  }

  delete(id: string): Promise<void> {
    return this.client.delete(apiMongo + '/www-product-page/' + id, refreshPathsOptions)
  }

  list(): Promise<IPage[]> {
    return this.client.get<any>(apiMongo + '/www-product-page').then(res => res.data || [])
  }
}
