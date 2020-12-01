import { injectable } from 'qn-fe-core/di'
import FetchStore from 'stores/fetch'
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

  constructor(private fetchStore: FetchStore) { }

  add(options: IBanner): Promise<void> {
    return this.fetchStore.postJSON(apiMongo + '/www-homepage-banner', options)
  }

  update(options: IBanner): Promise<void> {
    return this.fetchStore.putJSON(apiMongo + '/www-homepage-banner/' + options.name, options)
  }

  delete(name: string): Promise<void> {
    return this.fetchStore.delete(apiMongo + '/www-homepage-banner/' + name)
  }

  list(): Promise<IBanner[]> {
    return this.fetchStore.get(apiMongo + '/www-homepage-banner', { sort: '-editTime' }).then(data => data || [])
  }
}
