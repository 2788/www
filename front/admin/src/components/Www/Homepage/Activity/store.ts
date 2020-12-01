import autobind from 'autobind-decorator'
import Store from 'qn-fe-core/store'
import ToasterStore from 'admin-base/common/stores/toaster'
import { injectable } from 'qn-fe-core/di'
import { action, computed, observable } from 'mobx'
import Loadings from 'admin-base/common/stores/loadings'
import ActivityApis, { IActivityWithId, IActivity } from 'apis/homepage/activity'
import { State } from 'constants/state'
import { genFilteredList } from 'components/common/State'

@injectable()
export default class ActivityStore extends Store {

  constructor(
    private activityApis: ActivityApis,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  @observable.ref list: IActivityWithId[] = []
  @observable.ref states: State[] = []
  loadings = Loadings.collectFrom(this)

  @computed
  get isLoading() {
    return !this.loadings.isAllFinished()
  }

  @computed
  get filteredList(): IActivityWithId[] {
    return genFilteredList(this.states, this.list)
  }

  @action.bound
  updateList(list: IActivityWithId[]) {
    this.list = list
  }

  @action.bound
  updateStates(states: State[]) {
    this.states = states
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList() {
    return this.activityApis.list().then((res: IActivityWithId[]) => this.updateList(res))
  }

  @action.bound
  refresh() {
    this.updateList([])
    return this.fetchList()
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
}
