import autobind from 'autobind-decorator'
import Store from 'qn-fe-core/store'
import ToasterStore from 'admin-base/common/stores/toaster'
import { injectable } from 'qn-fe-core/di'
import { action, computed, observable } from 'mobx'
import Loadings from 'admin-base/common/stores/loadings'
import PageApis, { IPage } from 'apis/product/page'

@injectable()
export default class PageStore extends Store {

  constructor(
    private pageApis: PageApis,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
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
    this.updateList([])
    return this.fetchList()
  }

  add(data: IPage) {
    return this.pageApis.add(data)
  }

  update(data: IPage) {
    return this.pageApis.update(data)
  }

  @ToasterStore.handle('删除产品页成功！')
  del(id: string) {
    return this.pageApis.delete(id)
  }
}
