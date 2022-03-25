import { action, computed, observable } from 'mobx'
import autobind from 'autobind-decorator'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'
import { Loadings } from 'admin-base/common/loading'
import { ModalStore } from 'admin-base/common/utils/modal'
import { ToasterStore } from 'admin-base/common/toaster'

import BannerApis, { IBannerWithId, IListResponse } from 'apis/global-banner'
import { EditorStatus } from 'constants/editor'
import { State } from 'constants/state'
import { genFilteredList } from 'components/common/State'

import { ExtraProps as EditorModalProps } from './EditorModal'

@injectable()
export default class BannersStore extends Store {

  constructor(
    private bannerApis: BannerApis,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bindTo(this, toasterStore)
  }

  @observable currentPage = 1
  @observable.ref list: IBannerWithId[] = []
  @observable.ref states: State[] = []

  editorModal = new ModalStore<EditorModalProps>()
  loadings = Loadings.collectFrom(this)

  @computed
  get isLoading() {
    return !this.loadings.isAllFinished()
  }

  @action.bound
  updateCurrentPage(page: number) {
    this.currentPage = page
  }

  @action.bound
  updateStates(states: State[]) {
    this.states = states
  }

  @computed
  get filteredList(): IBannerWithId[] {
    return genFilteredList(this.states, this.list)
  }

  @action.bound
  updateList(list: IBannerWithId[]) {
    this.list = list
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList() {
    return this.bannerApis.list()
      .then((res: IListResponse) => this.updateList(res.data))
  }

  @autobind
  refresh() {
    return this.fetchList().then(() => this.updateCurrentPage(1))
  }

  @autobind
  @ToasterStore.handle()
  handleAdd() {
    return this.editorModal.open({
      status: EditorStatus.Creating
    }).then(() => this.refresh())
  }

  @autobind
  @ToasterStore.handle()
  handleEdit(id: string) {
    const banner = this.filteredList.find(item => item._id === id)
    return this.editorModal.open({
      status: EditorStatus.Editing,
      banner
    }).then(() => this.refresh())
  }

  @autobind
  @ToasterStore.handle('删除全局公告成功')
  handleDelete(id: string) {
    return this.bannerApis.delete(id).then(() => this.refresh())
  }

  init() {
    this.addDisposer(
      () => this.editorModal.dispose()
    )
    this.refresh()
  }
}
