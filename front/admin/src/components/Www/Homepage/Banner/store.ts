import { action, computed, observable } from 'mobx'
import autobind from 'autobind-decorator'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'
import { Loadings } from 'admin-base/common/loading'

import BannerApis, { IBanner } from 'apis/homepage/banner'
import { State } from 'constants/state'
import { genFilteredList } from 'components/common/State'

@injectable()
export default class BannerStore extends Store {

  constructor(
    private bannerApis: BannerApis
  ) {
    super()
  }

  @observable.ref list: IBanner[] = []
  @observable.ref states: State[] = []
  loadings = Loadings.collectFrom(this)

  @computed
  get isLoading() {
    return !this.loadings.isAllFinished()
  }
  @computed
  get filteredList(): IBanner[] {
    return genFilteredList(this.states, this.list)
  }

  @action.bound
  updateList(list: IBanner[]) {
    this.list = list
  }

  @action.bound
  updateStates(states: State[]) {
    this.states = states
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList() {
    return this.bannerApis.list().then((res: IBanner[]) => this.updateList(res))
  }

  @action.bound
  refresh() {
    return this.fetchList()
  }

  add(data: IBanner) {
    return this.bannerApis.add(data)
  }

  update(data: IBanner) {
    return this.bannerApis.update(data)
  }

  del(name: string) {
    return this.bannerApis.delete(name)
  }
}
