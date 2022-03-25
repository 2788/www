import { action, computed, observable } from 'mobx'
import autobind from 'autobind-decorator'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'

import { ToasterStore } from 'admin-base/common/toaster'
import { Loadings } from 'admin-base/common/loading'

import ActivityApis, { IActivityWithId, IActivity, IListOptions, IListResponse } from 'apis/activity'
import { StateType } from 'constants/activity'
import { pageSize } from '.'

type FecthListOptions = { page: number, states?: StateType[] }
@injectable()
export default class ActivityStore extends Store {

  constructor(
    private activityApis: ActivityApis,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bindTo(this, toasterStore)
  }

  @observable.ref total = 0
  @observable.ref options: FecthListOptions | null = null // list 查询条件，方便获取之前的查询条件
  @observable.ref list: IActivityWithId[] = []

  loadings = Loadings.collectFrom(this)

  @computed
  get isLoading() {
    return !this.loadings.isAllFinished()
  }

  @action.bound
  updateOptions(options: FecthListOptions | null) {
    this.options = options
  }

  @action.bound
  updateList(total = 0, list: IActivityWithId[] = []) {
    this.total = total
    this.list = list
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList({ page, states }: FecthListOptions) {
    this.updateOptions({ page, states })
    const opt: IListOptions = { limit: pageSize, offset: (page - 1) * pageSize, states }
    return this.activityApis.list(opt).then((res: IListResponse) => this.updateList(res.count, res.data))
  }

  @action.bound
  refresh() {
    return this.fetchList({ ...this.options, page: 1 })
  }

  add(data: IActivity) {
    return this.activityApis.add(data)
  }

  update(data: IActivity, id: string) {
    return this.activityApis.update(data, id)
  }

  del(id: string) {
    return this.activityApis.delete(id)
  }

  getRegistrationsCount(id: string) {
    return this.activityApis.getRegistrationsCount(id)
  }

  getRegistrations(id: string, total: number) {
    return this.activityApis.getRegistrations(id, total)
  }

  createScanner() {
    return this.activityApis.createScanner()
  }
}
