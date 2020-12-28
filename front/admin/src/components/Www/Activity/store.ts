import autobind from 'autobind-decorator'
import Store from 'qn-fe-core/store'
import ToasterStore from 'admin-base/common/stores/toaster'
import { injectable } from 'qn-fe-core/di'
import { action, computed, observable } from 'mobx'
import Loadings from 'admin-base/common/stores/loadings'
import ActivityApis, { IActivityWithId, IActivity, IListOptions, IListResponse } from 'apis/activity'

@injectable()
export default class ActivityStore extends Store {

  constructor(
    private activityApis: ActivityApis,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  @observable.ref total = 0
  @observable.ref list: IActivityWithId[] = []

  loadings = Loadings.collectFrom(this)

  @computed
  get isLoading() {
    return !this.loadings.isAllFinished()
  }

  @action.bound
  updateList(total = 0, list: IActivityWithId[] = []) {
    this.total = total
    this.list = list
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList(options: IListOptions) {
    return this.activityApis.list(options).then((res: IListResponse) => this.updateList(res.count, res.data))
  }

  @action.bound
  refresh() {
    this.updateList()
    return this.fetchList({ page: 1 })
  }

  add(data: IActivity) {
    return this.activityApis.add(data)
  }

  update(data: IActivity, id: string) {
    return this.activityApis.update(data, id)
  }

  @ToasterStore.handle('删除活动成功！')
  del(id: string) {
    return this.activityApis.delete(id)
  }

  getUserCount(id: string) {
    return this.activityApis.getUserCount(id)
  }

  getAllUsers(id: string, total: number) {
    return this.activityApis.getAllUsers(id, total)
  }
}
