/**
 * @file          component  Versions
 * @description   价格历史修订记录列表 modal 页面
 * @author        renpanpan
 */

import React from 'react'
import { computed, reaction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { saveAs } from 'file-saver'

import Table, { PaginationConfig } from 'react-icecream/lib/table'
import { PaginationProps } from 'react-icecream/lib/pagination'
import autobind from 'autobind-decorator'
import { useInjection } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'

import { ToasterStore } from 'admin-base/common/toaster'
import { Loadings } from 'admin-base/common/loading'
import { ModalProps as IModalProps } from 'admin-base/common/utils/modal'

import PriceApis, { IVersion } from 'apis/product/price'
import { timeFormatter } from 'utils/time'
import Modal from 'components/common/Modal'
import commonStyle from 'utils/style.m.less'

import PricesStore from '../store'

export type ExtraProps = { product: string | null }
export type Props = IModalProps & ExtraProps

const pageSize = 5 // 表格数据一页条数

@injectable()
class LocalStore extends Store {

  constructor(
    @injectProps()
    private props: Props,
    private priceApis: PriceApis,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bindTo(this, toasterStore)
  }

  loadings = Loadings.collectFrom(this)
  @observable currentPage = 1
  @observable.ref list: IVersion[] = []

  @computed
  get isLoading() {
    return !this.loadings.isAllFinished()
  }

  @computed
  get total() {
    return this.list.length
  }

  @action.bound
  updateCurrentPage(page: number) {
    this.currentPage = page
  }

  @action.bound
  updateList(list: IVersion[]) {
    this.list = list
  }

  @autobind
  @Loadings.handle('fetchList')
  fetchList(product: string) {
    return this.priceApis.getVersionsByProduct(product)
      .then(list => {
        this.updateList(list)
        this.updateCurrentPage(1)
      })
  }

  init() {
    this.addDisposer(
      reaction(
        () => [this.props.product, this.props.visible] as const,
        ([product, visible]) => {
          if (product !== null && visible) {
            this.fetchList(product)
          }
        },
        { fireImmediately: true }
      )
    )
  }
}

export default observer(function VersionsModal(props: Props) {
  props = { product: null, ...props as any /** FIXME */ }
  const store = useLocalStore(LocalStore, props)
  const { list, isLoading, total } = store
  const { visible, product, onCancel } = props
  const pricesStore = useInjection(PricesStore)
  const { pageMap } = pricesStore
  if (product === null) {
    return null
  }

  const renderFile = (_: unknown, record: IVersion) => (
    <a onClick={() => saveAs(record.fileUrl, record.fileName)}> {record.fileName}</a >
  )
  const paginationConfig: PaginationConfig = {
    total,
    pageSize,
    current: store.currentPage
  }
  const handleTableChange = (pag: PaginationProps) => {
    store.updateCurrentPage(pag.current || 1)
  }

  return (
    <Modal
      visible={visible}
      title={`${pageMap.get(product) || ''} 价格历史修订记录`}
      onCancel={onCancel}
      footer={null}
    >
      <Table
        dataSource={list.slice()}
        rowKey="product"
        loading={isLoading}
        bodyStyle={{ backgroundColor: '#fff' }}
        pagination={paginationConfig}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
      >
        <Table.Column title="文件" width={250} dataIndex="file" className={commonStyle.cellContent} render={renderFile} />
        <Table.Column title="创建人" width={100} dataIndex="creator" render={(val: string) => val || '-'} />
        <Table.Column title="创建时间" width={160} dataIndex="createdAt" render={timeFormatter('YYYY-MM-DD HH:mm')} />
      </Table>
    </Modal>
  )
})
