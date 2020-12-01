import autobind from 'autobind-decorator'
import Store from 'qn-fe-core/store'
import ToasterStore from 'admin-base/common/stores/toaster'
import { injectable } from 'qn-fe-core/di'
import { action, computed, observable } from 'mobx'
import Loadings from 'admin-base/common/stores/loadings'
import NewsApis, { INews, INewsWithId } from 'apis/homepage/news'

@injectable()
export default class InfoStore extends Store {

  constructor(
    private newsApis: NewsApis,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  @observable.ref list: INewsWithId[] = []
  loadings = Loadings.collectFrom(this)

  @computed
  get isLoading() {
    return !this.loadings.isAllFinished()
  }

  @action.bound
  updateList(list: INewsWithId[]) {
    this.list = list
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList() {
    return this.newsApis.list().then((res: INewsWithId[]) => this.updateList(res))
  }

  @action.bound
  refresh() {
    this.updateList([])
    return this.fetchList()
  }

  add(data: INews) {
    return this.newsApis.add(data)
  }

  update(data: INews, id: string) {
    return this.newsApis.update(data, id)
  }

  @ToasterStore.handle('删除资讯成功！')
  del(id: string) {
    return this.newsApis.delete(id)
  }

  getArchive(id: string) {
    return this.newsApis.getArchive(id)
  }
}
