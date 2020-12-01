import autobind from 'autobind-decorator'
import Store from 'qn-fe-core/store'
import ToasterStore from 'admin-base/common/stores/toaster'
import { injectable } from 'qn-fe-core/di'
import { action, computed, observable } from 'mobx'
import Loadings from 'admin-base/common/stores/loadings'
import NoticeApis, { INotice, INoticeWithId } from 'apis/product/notice'
import PageApis, { IPage } from 'apis/product/page'
import { State } from 'constants/state'
import { genFilteredList } from 'components/common/State'

@injectable()
export default class NoticeStore extends Store {

  constructor(
    private noticeApis: NoticeApis,
    private pageApis: PageApis,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  @observable.ref list: INoticeWithId[] = []
  @observable.ref pageList: IPage[] = []
  @observable.ref states: State[] = []
  loadings = Loadings.collectFrom(this)

  @computed
  get isLoading() {
    return !this.loadings.isAllFinished()
  }

  @computed
  get filteredList(): INoticeWithId[] {
    return genFilteredList(this.states, this.list)
  }

  @action.bound
  updateList(list: INoticeWithId[]) {
    this.list = list
  }

  @action.bound
  updatePageList(list: IPage[]) {
    this.pageList = list
  }

  @action.bound
  updateStates(states: State[]) {
    this.states = states
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList() {
    return this.noticeApis.list().then((res: INoticeWithId[]) => this.updateList(res))
  }

  // 获取产品页列表
  @autobind
  @Loadings.handle('fetchPageList')
  fetchPageList() {
    const req = this.pageApis.list()
    req.then((data: IPage[]) => {
      this.updatePageList(data)
    })
    return req
  }

  @action.bound
  refresh() {
    this.updateList([])
    return this.fetchList()
  }

  @autobind
  async init() {
    await Promise.all([this.fetchPageList(), this.fetchList()])
  }

  add(data: INotice) {
    return this.noticeApis.add(data)
  }

  update(data: INotice, id: string) {
    return this.noticeApis.update(data, id)
  }

  @ToasterStore.handle('删除产品公告成功！')
  del(id: string) {
    return this.noticeApis.delete(id)
  }
}
