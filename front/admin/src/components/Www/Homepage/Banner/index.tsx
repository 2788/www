import React from 'react'
import { observable, action } from 'mobx'
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
import { StateCheckboxGroup, renderState } from 'components/common/State'
import ImgPreview from 'components/common/ImgPreview'
import { IBanner } from 'apis/homepage/banner'
import { timeFormatter } from 'utils/time'
import * as commonStyle from 'utils/style.m.less'

import { EditorStatus } from 'constants/editor'
import BannerStore from './store'
import EditorModal, { ExtraProps } from './Editor'

import * as style from './style.m.less'

// 顺序个数
export const maxNum = 6
// 表格数据一页条数
const pageSize = 5
@injectable()
class LocalStore extends Store {

  constructor(
    public bannerStore: BannerStore,
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
      this.bannerStore.refresh()
    ).then(() => this.updateCurrentPage(page || 1))
  }
  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating }).then(() => this.refresh())
  }

  @autobind
  edit(name: string) {
    const banner = this.bannerStore.filteredList.find(item => item.name === name)
    this.editorModal.open(
      { banner, status: EditorStatus.Editing }
    ).then(() => this.refresh(this.currentPage))
  }

  @autobind
  @ToasterStore.handle('删除 banner 成功！')
  del(name: string) {
    return this.bannerStore.del(name).then(() => this.refresh())
  }

  @autobind
  handleDelete(name: string) {
    Modal.confirm({
      title: `确定要删除 banner ${name}？`,
      okType: 'danger',
      onOk: () => this.del(name)
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
  const bannerStore = store.bannerStore
  const { list, isLoading } = bannerStore

  const renderImg = (item: 'pcImg' | 'mobileImg') => (_: string, record: IBanner) => <ImgPreview url={record[item]} />

  const renderOther = (_: string, record: IBanner) => (
    <>
      <h5>背景色：<div className={style.color} style={{ backgroundColor: `${record.backgroundColor}` }} /></h5>
      <h5>跳转：{record.link}</h5>
      <h5>顺序：{record.order}</h5>
    </>
  )
  const renderTime = (_: string, record: IBanner) => timeFormatter('YYYY-MM-DD')(record.effectTime) + ' 至 ' + timeFormatter('YYYY-MM-DD')(record.invalidTime)
  const renderOperation = (_: string, record: IBanner) => (
    <div className={commonStyle.operation}>
      <Tooltip title="编辑">
        <a onClick={() => store.edit(record.name)}>
          <Icon type="edit" />
        </a>
      </Tooltip>
      <Tooltip title="删除">
        <a onClick={() => store.handleDelete(record.name)}>
          <Icon type="delete" />
        </a>
      </Tooltip>
    </div>
  )

  // 筛选
  const orderFilters = Array.from({ length: maxNum }, (_, i) => ({ text: '顺序：' + (i + 1), value: i + 1 }))
  const filterOrder = (value: number, record: IBanner) => record.order === value
  // 排序
  const sortCreateTime = (a: IBanner, b: IBanner) => a.createTime - b.createTime
  const sortEditTime = (a: IBanner, b: IBanner) => a.editTime - b.editTime
  const pagination: PaginationConfig = {
    pageSize,
    current: store.currentPage,
    onChange: store.updateCurrentPage
  }
  return (
    <>
      <Container>
        <StateCheckboxGroup onChange={bannerStore.updateStates} />
        <Spacer />
        <Button icon="plus" onClick={store.add}>添加 banner</Button>
      </Container>
      <Table
        dataSource={list.slice()}
        rowKey="name"
        loading={isLoading}
        bodyStyle={{ backgroundColor: '#fff' }}
        pagination={pagination}
        scroll={{ x: 'max-content' }}
      >
        <Table.Column title="名称" width={120} dataIndex="name" className={commonStyle.cellContent} />
        <Table.Column title="状态" width={100} render={renderState} />
        <Table.Column title="PC 端缩略图" width={150} dataIndex="pcImg" render={renderImg('pcImg')} />
        <Table.Column title="移动端缩略图" width={150} dataIndex="mobileImg" render={renderImg('mobileImg')} />
        <Table.Column title="其他信息" width={200} dataIndex="other" render={renderOther} filters={orderFilters} onFilter={filterOrder} className={commonStyle.cellContent} />
        <Table.Column title="生效时间段" width={240} render={renderTime} />
        <Table.Column title="创建时间" width={120} dataIndex="createTime" render={timeFormatter('YYYY-MM-DD')} sorter={sortCreateTime} />
        <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} sorter={sortEditTime} />
        <Table.Column title="操作" width={80} render={renderOperation} />
      </Table>
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind()} />}
    </>
  )
})

export default function Banner() {
  return (
    <Provider provides={[{ identifier: BannerStore, constr: BannerStore }]} >
      <PageContent />
    </Provider>
  )
}
