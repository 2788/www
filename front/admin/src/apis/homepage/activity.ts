import { injectable } from 'qn-fe-core/di'
import moment from 'moment'
import FetchStore from 'stores/fetch'
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

  constructor(private fetchStore: FetchStore) { }

  add(options: IActivity): Promise<void> {
    options = { ...options, ...{ createTime: moment().unix(), editTime: moment().unix() } }
    return this.fetchStore.postJSON(apiMongo + '/www-homepage-activity', options)
  }

  update(options: IActivity, id: string): Promise<void> {
    options = { ...options, editTime: moment().unix() }
    return this.fetchStore.putJSON(apiMongo + '/www-homepage-activity/' + id, options)
  }

  delete(id: string): Promise<void> {
    return this.fetchStore.delete(apiMongo + '/www-homepage-activity/' + id)
  }

  list(): Promise<IActivityWithId[]> {
    return this.fetchStore.get(apiMongo + '/www-homepage-activity', { sort: '-editTime' }).then(res => res.data || [])
  }
}
