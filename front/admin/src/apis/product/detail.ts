import { injectable } from 'qn-fe-core/di'
import FetchStore from 'stores/fetch'
import { apiMongo } from 'constants/api-prefix'

export interface IDetail {
  product: string
  summary: string
  link: string
  type: string
  effectTime: number
  invalidTime: number
  createTime: number
  editTime: number
}

export interface IDetailWithId extends IDetail {
  _id: string
}

@injectable()
export default class DetailApis {

  constructor(private fetchStore: FetchStore) { }

  add(options: IDetail): Promise<void> {
    return this.fetchStore.postJSON(apiMongo + '/www-product-detail', options)
  }

  update(options: IDetail, news_id: string): Promise<void> {
    return this.fetchStore.putJSON(apiMongo + '/www-product-detail/' + news_id, options)
  }

  delete(news_id: string): Promise<void> {
    return this.fetchStore.delete(apiMongo + '/www-product-detail/' + news_id)
  }

  list(): Promise<IDetailWithId[]> {
    return this.fetchStore.get(apiMongo + '/www-product-detail', { sort: '-editTime' }).then(data => data || [])
  }
}
