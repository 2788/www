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
import ImgPreview from 'components/common/ImgPreview'
import { EditorStatus } from 'constants/editor'
import { IActivityWithId } from 'apis/homepage/activity'
import { timeFormatter } from 'utils/time'
import * as style from 'utils/style.m.less'

import { labelMap } from './LabelInput'
import ActivityStore from './store'
import EditorModal, { ExtraProps } from './Editor'

// 顺序个数
export const maxNum = 4
// 表格数据一页条数
const pageSize = 5
@injectable()
class LocalStore extends Store {

  constructor(
    public activityStore: ActivityStore,
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
      this.activityStore.refresh()
    ).then(() => this.updateCurrentPage(page || 1))
  }

  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating }).then(() => this.refresh())
  }

  @autobind
  edit(id: string) {
    const activity = this.activityStore.filteredList.find(item => item._id === id)
    this.editorModal.open(
      { activity, id, status: EditorStatus.Editing }
    ).then(() => this.refresh(this.currentPage))
  }

  @autobind
  @ToasterStore.handle('删除活动成功！')
  del(id: string) {
    return this.activityStore.del(id).then(() => this.refresh())
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
    this.refresh()
  }
}

const PageContent = observer(function _PageContent() {
  const store = useLocalStore(LocalStore)
  const activityStore = store.activityStore
  const { list, isLoading } = activityStore

  const renderImg = (_: string, record: IActivityWithId) => <ImgPreview url={record.icon} />
  const renderOther = (_: string, record: IActivityWithId) => (
    <>
      <h5>跳转：{record.link}</h5>
      <h5>标签：{labelMap[record.label] ? labelMap[record.label] : record.label}</h5>
      <h5>顺序：{record.order}</h5>
    </>
  )
  const renderTime = (_: string, record: IActivityWithId) => timeFormatter('YYYY-MM-DD')(record.effectTime) + ' 至 ' + timeFormatter('YYYY-MM-DD')(record.invalidTime)
  const renderOperation = (_: string, record: IActivityWithId) => (
    <div className={style.operation}>
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
  const orderFilters = Array.from({ length: maxNum }, (_, i) => ({ text: '顺序：' + (i + 1), value: i + 1 }))
  const filterOrder = (value: number, record: IActivityWithId) => record.order === value
  // 排序
  const sortCreateTime = (a: IActivityWithId, b: IActivityWithId) => a.createTime - b.createTime
  const sortEditTime = (a: IActivityWithId, b: IActivityWithId) => a.editTime - b.editTime
  const pagination: PaginationConfig = {
    pageSize,
    current: store.currentPage,
    onChange: store.updateCurrentPage
  }

  return (
    <>
      <Container>
        <StateCheckboxGroup onChange={activityStore.updateStates} />
        <Spacer />
        <Button icon="plus" onClick={store.add}>添加活动</Button>
      </Container>
      <Table
        dataSource={list.slice()}
        rowKey="_id"
        loading={isLoading}
        bodyStyle={{ backgroundColor: '#fff' }}
        pagination={pagination}
        scroll={{ x: 'max-content' }}
      >
        <Table.Column title="序号" width={80} render={(_text, _record, index) => index + 1} />
        <Table.Column title="标题" width={120} dataIndex="title" className={style.cellContent} />
        <Table.Column title="副标题" width={120} dataIndex="subTitle" className={style.cellContent} />
        <Table.Column title="状态" width={100} render={renderState} />
        <Table.Column title="icon" width={100} render={renderImg} />
        <Table.Column title="其他信息" width={200} dataIndex="other" render={renderOther} filters={orderFilters} onFilter={filterOrder} className={style.cellContent} />
        <Table.Column title="生效时间段" width={240} render={renderTime} />
        <Table.Column title="创建时间" width={120} dataIndex="createTime" render={timeFormatter('YYYY-MM-DD')} sorter={sortCreateTime} />
        <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} sorter={sortEditTime} />
        <Table.Column title="操作" width={80} render={renderOperation} />
      </Table>
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind()} />}
    </>
  )
})

export default function Activity() {
  return (
    <Provider provides={[{ identifier: ActivityStore, constr: ActivityStore }]} >
      <PageContent />
    </Provider>
  )
}
