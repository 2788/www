import { injectable } from 'qn-fe-core/di'
import FetchStore from 'stores/fetch'
import { apiMongo } from 'constants/api-prefix'

export interface IPage {
  id: string
  name: string
  link: string
}

@injectable()
export default class PageApis {

  constructor(private fetchStore: FetchStore) { }

  add(options: IPage): Promise<void> {
    return this.fetchStore.postJSON(apiMongo + '/www-product-page', options)
  }

  update(options: IPage): Promise<void> {
    return this.fetchStore.putJSON(apiMongo + '/www-product-page/' + options.id, options)
  }

  delete(id: string): Promise<void> {
    return this.fetchStore.delete(apiMongo + '/www-product-page/' + id)
  }

  list(): Promise<IPage[]> {
    return this.fetchStore.get(apiMongo + '/www-product-page').then(data => data || [])
  }
}
