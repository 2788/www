import { action, computed, observable } from 'mobx'
import autobind from 'autobind-decorator'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'
import { Loadings } from 'admin-base/common/loading'

import PageApis, { IPage } from 'apis/product/page'

@injectable()
export default class PageStore extends Store {

  constructor(
    private pageApis: PageApis
  ) {
    super()
  }

  @observable.ref list: IPage[] = []
  loadings = Loadings.collectFrom(this)

  @computed
  get isLoading() {
    return !this.loadings.isAllFinished()
  }

  @action.bound
  updateList(list: IPage[]) {
    this.list = list
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList() {
    return this.pageApis.list().then((res: IPage[]) => this.updateList(res))
  }

  @action.bound
  refresh() {
    return this.fetchList()
  }

  add(data: IPage) {
    return this.pageApis.add(data)
  }

  update(data: IPage) {
    return this.pageApis.update(data)
  }

  del(id: string) {
    return this.pageApis.delete(id)
  }
}
