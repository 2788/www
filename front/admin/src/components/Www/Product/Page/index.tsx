import React from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Tooltip, Icon, Modal, Button } from 'react-icecream-1'
import Table, { PaginationConfig } from 'react-icecream-1/lib/table'
import autobind from 'autobind-decorator'

import { useLocalStore } from 'qn-fe-core/local-store'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'
import { Provider } from 'qn-fe-core/di'
import { ModalStore } from 'admin-base/common/utils/modal'
import { ToasterStore } from 'admin-base/common/toaster'

import { Spacer } from 'libs/layout-element'
import Container from 'components/common/Container'
import { EditorStatus } from 'constants/editor'
import { IPage } from 'apis/product/page'
import style from 'utils/style.m.less'

import PageStore from './store'
import EditorModal, { ExtraProps } from './Editor'

// 表格数据一页条数
const pageSize = 8
@injectable()
class LocalStore extends Store {

  constructor(
    public pageStore: PageStore,
    public toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bindTo(this, toasterStore)
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
      this.pageStore.refresh()
    ).then(() => this.updateCurrentPage(page || 1))
  }

  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating }).then(() => this.refresh())
  }

  @autobind
  edit(id: string) {
    const page = this.pageStore.list.find(item => item.id === id)
    this.editorModal.open(
      { page, status: EditorStatus.Editing }
    ).then(() => this.refresh())
  }

  @autobind
  @ToasterStore.handle('删除产品页成功！')
  del(id: string) {
    return this.pageStore.del(id).then(() => this.refresh())
  }

  @autobind
  handleDelete(id: string) {
    Modal.confirm({
      title: `确定要删除产品页 ${id}？`,
      okType: 'danger',
      onOk: () => this.del(id)
    })
  }

  init() {
    this.addDisposer(
      () => this.editorModal.dispose()
    )
    this.refresh()
  }
}

const PageContent = observer(function _PageContent() {
  const store = useLocalStore(LocalStore)
  const pageStore = store.pageStore
  const { list, isLoading } = pageStore

  const renderOperation = (_: string, record: IPage) => (
    <div className={style.operation}>
      <Tooltip title="编辑">
        <a onClick={() => store.edit(record.id)}>
          <Icon type="edit" />
        </a>
      </Tooltip>
      <Tooltip title="删除">
        <a onClick={() => store.handleDelete(record.id)}
          style={{ marginLeft: 16 }}
        >
          <Icon type="delete" />
        </a>
      </Tooltip>
    </div>
  )

  const pagination: PaginationConfig = {
    pageSize,
    current: store.currentPage,
    onChange: store.updateCurrentPage
  }

  return (
    <>
      <Container>
        <Spacer />
        <Button icon="plus" onClick={store.add}>添加产品页</Button>
      </Container>
      <Table
        dataSource={list.slice()}
        rowKey="id"
        loading={isLoading}
        bodyStyle={{ backgroundColor: '#fff' }}
        pagination={pagination}
        scroll={{ x: 'max-content' }}
      >
        <Table.Column title="页面 ID" width={120} dataIndex="id" />
        <Table.Column title="页面名称" width={200} dataIndex="name" />
        <Table.Column title="链接地址" width={200} dataIndex="link" />
        <Table.Column title="操作" width={100} render={renderOperation} />
      </Table>
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind() as any} />}
    </>
  )
})

export default function Page() {
  return (
    <Provider provides={[{ identifier: PageStore, constr: PageStore }]} >
      <PageContent />
    </Provider>
  )
}
