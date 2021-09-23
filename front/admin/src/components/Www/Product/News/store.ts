/**
 * @file          Product News store
 * @description   index 所需的 store，handle前缀的表示为需要ToasterStore.handle装饰的处理函数
 * @author        renpanpan
 */

import { action, computed, observable } from 'mobx'
import autobind from 'autobind-decorator'
import Store from 'qn-fe-core/store'
import { injectable } from 'qn-fe-core/di'

import Loadings from 'admin-base/common/stores/loadings'
import ModalStore from 'admin-base/common/stores/modal'
import ToasterStore from 'admin-base/common/stores/toaster'

import NewsApis, { INewsWithId, IListOptions, IListResponse } from 'apis/product/news'
import PageApis, { IPage } from 'apis/product/page'
import { EditorStatus } from 'constants/editor'

import { ExtraProps } from './Editor'
import { pageSize } from '.'

type FecthListOptions = Omit<IListOptions, 'limit' | 'offset'> & { page: number }
@injectable()
export default class NewsStore extends Store {

  constructor(
    private newsApis: NewsApis,
    private pageApis: PageApis,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  editorModal = new ModalStore<ExtraProps>()
  @observable total = 0
  @observable currentPage = 1
  @observable.ref options: FecthListOptions | null = null // list 查询条件，方便获取之前的查询条件
  @observable.ref list: INewsWithId[] = []
  @observable.ref pageList: IPage[] = []
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
  updateOptions(options: FecthListOptions | null) {
    this.options = options
  }

  @action.bound
  updateList(total = 0, list: INewsWithId[]) {
    this.total = total
    this.list = list
  }

  @action.bound
  updatePageList(list: IPage[]) {
    this.pageList = list
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList({ page, products, types }: FecthListOptions) {
    this.updateOptions({ page, products, types })
    const opts: IListOptions = { limit: pageSize, offset: (page - 1) * pageSize, products, types }
    return this.newsApis.list(opts).then((res: IListResponse) => this.updateList(res.count, res.data))
  }

  // 获取产品页列表
  @autobind
  @Loadings.handle('fetchPageList')
  fetchPageList() {
    return this.pageApis.list().then(this.updatePageList)
  }

  @autobind
  refresh(page?: number) {
    page = page || 1
    return this.fetchList(
      { ...this.options, page }
    ).then(() => this.updateCurrentPage(page!))
  }

  @autobind
  @ToasterStore.handle()
  handleFetchList(opt: Omit<IListOptions, 'limit' | 'offset'> & { page: number }) {
    return this.fetchList(opt)
  }

  @autobind
  @ToasterStore.handle()
  handleAdd() {
    return this.editorModal.open({ status: EditorStatus.Creating }).then(() => this.refresh())
  }

  @autobind
  @ToasterStore.handle()
  handleEdit(id: string) {
    const news = this.list.find(item => item._id === id)
    return this.editorModal.open(
      { news, id, status: EditorStatus.Editing }
    ).then(() => this.refresh(this.currentPage))
  }

  @autobind
  @ToasterStore.handle('删除产品动态成功')
  handleDelete(id: string) {
    return this.newsApis.delete(id).then(() => this.refresh())
  }

  @ToasterStore.handle()
  async init() {
    this.addDisposer(
      () => this.editorModal.dispose()
    )
    await Promise.all([this.fetchPageList(), this.fetchList({ page: 1 })])
  }
}
