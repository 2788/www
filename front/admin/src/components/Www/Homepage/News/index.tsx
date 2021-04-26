import React from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Tooltip, Icon, Button } from 'react-icecream'
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
import ImgPreview from 'components/common/ImgPreview'
import { INewsWithId } from 'apis/homepage/news'
import { timeFormatter } from 'utils/time'
import * as style from 'utils/style.m.less'

import { EditorStatus } from 'constants/editor'
import NewsStore from './store'
import EditorModal, { ExtraProps } from './Editor'

// 顺序个数，也即是列表最大条数
export const maxNum = 4
// 表格数据一页条数
const pageSize = 5

@injectable()
class LocalStore extends Store {

  constructor(
    public newsStore: NewsStore,
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
  refresh() {
    this.toasterStore.promise(this.newsStore.refresh())
  }

  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating }).then(() => this.refresh())
  }

  @autobind
  edit(id: string) {
    const news = this.newsStore.list.find(item => item._id === id)
    this.editorModal.open({ news, id, status: EditorStatus.Editing }).then(() => this.refresh())
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
  const newsStore = store.newsStore
  const { list, isLoading } = newsStore

  const renderBanner = (_: string, record: INewsWithId) => <ImgPreview url={record.banner} />
  const renderOperation = (_: string, record: INewsWithId) => (
    <Tooltip title="更换">
      <a onClick={() => store.edit(record._id)}>
        <Icon type="edit" />
      </a>
    </Tooltip>
  )

  // 筛选
  const orderFilters = Array.from({ length: maxNum }, (_, i) => ({ text: i + 1, value: i + 1 }))
  const filterOrder = (value: number, record: INewsWithId) => record.order === value
  // 排序
  const sortEditTime = (a: INewsWithId, b: INewsWithId) => a.editTime - b.editTime
  const pagination: PaginationConfig = {
    pageSize,
    current: store.currentPage,
    onChange: store.updateCurrentPage
  }

  return (
    <>
      <Container>
        <Spacer />
        {/* 大于 maxNum 条时不展示添加 */}
        <Button icon="plus" onClick={store.add} hidden={list && list.length >= maxNum}>添加资讯</Button>
      </Container>
      <Table
        dataSource={list.slice()}
        rowKey="_id"
        loading={isLoading}
        bodyStyle={{ backgroundColor: '#fff' }}
        pagination={pagination}
        scroll={{ x: 'max-content' }}
      >
        <Table.Column title="展示顺序" width={100} dataIndex="order" filters={orderFilters} onFilter={filterOrder} />
        <Table.Column title="文章 ID" width={100} dataIndex="articleId" />
        <Table.Column title="资讯标题" width={200} dataIndex="title" />
        <Table.Column title="资讯 banner" width={150} render={renderBanner} />
        <Table.Column title="跳转链接" width={200} dataIndex="link" className={style.cellContent} />
        <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} sorter={sortEditTime} />
        <Table.Column title="操作" width={80} render={renderOperation} />
      </Table>
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind()} />}
    </>
  )
})

export default function News() {
  return (
    <Provider provides={[{ identifier: NewsStore, constr: NewsStore }]} >
      <PageContent />
    </Provider>
  )
}
