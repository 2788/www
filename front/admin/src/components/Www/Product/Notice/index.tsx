import React from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Tooltip, Icon, Modal, Button } from 'react-icecream'
import Table, { PaginationConfig } from 'react-icecream/lib/table'
import autobind from 'autobind-decorator'

import { injectable } from 'qn-fe-core/di'
import Provider from 'qn-fe-core/di/Provider'
import { useLocalStore } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'

import ModalStore from 'admin-base/common/stores/modal'
import ToasterStore from 'admin-base/common/stores/toaster'

import { Spacer } from 'libs/layout-element'
import Container from 'components/common/Container'
import { renderState, StateCheckboxGroup } from 'components/common/State'
import { timeFormatter } from 'utils/time'
import * as commonStyle from 'utils/style.m.less'

import { EditorStatus } from 'constants/editor'
import { INoticeWithId } from 'apis/product/notice'

import NoticeStore from './store'
import EditorModal, { ExtraProps } from './Editor'
import * as style from './style.m.less'

export const typeMap = {
  news: '新闻动态',
  welfares: '福利活动'
}
// 表格数据一页条数
const pageSize = 5

@injectable()
class LocalStore extends Store {

  constructor(
    public noticeStore: NoticeStore,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }
  editorModal = new ModalStore<ExtraProps>()
  @observable.ref currentPage = 1

  @action.bound
  updateCurrentPage(currentPage: number) {
    this.currentPage = currentPage
  }

  @autobind
  refresh(page?: number) {
    this.toasterStore.promise(
      this.noticeStore.refresh()
    ).then(() => this.updateCurrentPage(page || 1))
  }

  @autobind
  initList() {
    this.toasterStore.promise(this.noticeStore.init())
  }

  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating }).then(() => this.refresh())
  }

  @autobind
  edit(id: string) {
    const notice = this.noticeStore.filteredList.find(item => item._id === id)
    this.editorModal.open(
      { notice, id, status: EditorStatus.Editing }
    ).then(() => this.refresh(this.currentPage))
  }

  @autobind
  @ToasterStore.handle('删除产品公告成功！')
  del(id: string) {
    return this.noticeStore.del(id).then(() => this.refresh())
  }

  @autobind
  handleDelete(id: string) {
    Modal.confirm({
      title: '确定删除？',
      okType: 'danger',
      onOk: () => this.del(id)
    })
  }

  init() {
    this.addDisposer(
      () => this.editorModal.dispose()
    )
    this.initList()
  }
}

const PageContent = observer(function _PageContent() {
  const store = useLocalStore(LocalStore)
  const noticeStore = store.noticeStore
  const { pageList, list, isLoading } = noticeStore

  const renderProduct = (_: string, record: INoticeWithId) => {
    const page = pageList.find(item => item.id === record.product)
    return page ? page.name : record.product
  }
  const renderType = (_: string, record: INoticeWithId) => typeMap[record.type]
  const renderTime = (_: string, record: INoticeWithId) => timeFormatter('YYYY-MM-DD')(record.effectTime) + ' 至 ' + timeFormatter('YYYY-MM-DD')(record.invalidTime)
  const renderOperation = (_: string, record: INoticeWithId) => (
    <div className={commonStyle.operation}>
      <Tooltip title="编辑">
        <a onClick={() => store.edit(record._id)}>
          <Icon type="edit" />
        </a>
      </Tooltip>
      <Tooltip title="删除">
        <a onClick={() => store.handleDelete(record._id)}>
          <Icon type="delete" />
        </a>
      </Tooltip>
    </div>
  )

  // 筛选
  const productFilters = pageList.map(item => ({ text: item.name, value: item.id }))
  const typeFilters = Object.keys(typeMap).map(key => ({ text: typeMap[key], value: key }))
  const filterProduct = (value: string, record: INoticeWithId) => record.product === value
  const filterType = (value: string, record: INoticeWithId) => record.type === value
  // 排序
  const sortEditTime = (a: INoticeWithId, b: INoticeWithId) => a.editTime - b.editTime
  const pagination: PaginationConfig = {
    pageSize,
    current: store.currentPage,
    onChange: store.updateCurrentPage
  }

  return (
    <>
      <Container>
        <StateCheckboxGroup onChange={noticeStore.updateStates} />
        <Spacer />
        <Button icon="plus" onClick={store.add}>添加产品公告</Button>
      </Container>
      <Table
        dataSource={list.slice()}
        rowKey="_id"
        loading={isLoading}
        bodyStyle={{ backgroundColor: '#fff' }}
        pagination={pagination}
        scroll={{ x: 'max-content' }}
        className={style.table}
      >
        <Table.Column title="所在产品页" width={120} className={commonStyle.cellContent} dataIndex="product" render={renderProduct} filters={productFilters} onFilter={filterProduct} />
        <Table.Column title="摘要" width={120} className={commonStyle.cellContent} dataIndex="summary" />
        <Table.Column title="跳转链接" width={200} className={commonStyle.cellContent} dataIndex="link" />
        <Table.Column title="类型" width={100} dataIndex="type" render={renderType} filters={typeFilters} onFilter={filterType} />
        <Table.Column title="状态" width={100} render={renderState} />
        <Table.Column title="生效时间段" width={240} render={renderTime} />
        <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} sorter={sortEditTime} />
        <Table.Column title="操作" width={80} render={renderOperation} />
      </Table>
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind()} />}
    </>
  )
})

export default function Notice() {
  return (
    <Provider provides={[{ identifier: NoticeStore, constr: NoticeStore }]} >
      <PageContent />
    </Provider>
  )
}
