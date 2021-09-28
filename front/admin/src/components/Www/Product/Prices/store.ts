/**
 * @file          Product Prices store
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

import PriceApis, { IPrice, IListResponse } from 'apis/product/price'
import PageApis, { IPage } from 'apis/product/page'
import { ExtraProps as CreateModalProps } from './Create'
import { ExtraProps as VersionsModalProps } from './Versions'

@injectable()
export default class PricesStore extends Store {

  constructor(
    private priceApis: PriceApis,
    private pageApis: PageApis,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  createModal = new ModalStore<CreateModalProps>()
  versionsModal = new ModalStore<VersionsModalProps>()
  @observable currentPage = 1
  @observable.ref list: IPrice[] = []
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
  updateList(list: IPrice[]) {
    this.list = list
  }

  @computed
  get pageMap() {
    const map = new Map<string, string>()
    this.pageList.forEach(item => {
      map.set(item.id, item.name)
    })
    return map
  }

  @action.bound
  updatePageList(list: IPage[]) {
    this.pageList = list
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList() {
    return this.priceApis.list()
      .then((res: IListResponse) => this.updateList(res.data))
  }

  // 获取产品页列表
  @autobind
  @Loadings.handle('fetchPageList')
  fetchPageList() {
    return this.pageApis.list().then(this.updatePageList)
  }

  @autobind
  refresh() {
    return this.fetchList().then(() => this.updateCurrentPage(1))
  }

  @autobind
  @ToasterStore.handle()
  handleAdd() {
    return this.createModal.open().then(() => this.refresh())
  }

  @autobind
  @ToasterStore.handle()
  handleShowVersions(product: string) {
    return this.versionsModal.open({ product })
  }

  @autobind
  @ToasterStore.handle()
  handleAddNewVersion(record: IPrice, url: string, name: string) {
    const opts = {
      product: record.product,
      fileName: name,
      fileUrl: url
    }
    return Promise.all([
      this.priceApis.update({ ...opts, creator: record.creator, createdAt: record.createdAt }),
      this.priceApis.addVersion(opts)
    ])
  }

  @autobind
  @ToasterStore.handle('删除产品价格页成功')
  handleDelete(product: string) {
    return Promise.all([this.priceApis.delete(product), this.priceApis.deleteVersionsByProduct(product)])
      .then(() => this.refresh())
  }

  @ToasterStore.handle()
  async init() {
    this.addDisposer(
      () => this.createModal.dispose(),
      () => this.versionsModal.dispose()
    )
    await Promise.all([this.fetchPageList(), this.refresh()])
  }
}
