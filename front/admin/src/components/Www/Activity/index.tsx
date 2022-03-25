import React, { useCallback } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Tooltip, Icon, Modal, Button } from 'react-icecream-1'
import Table, { PaginationConfig } from 'react-icecream-1/lib/table'
import { PaginationProps } from 'react-icecream-1/lib/pagination'
import autobind from 'autobind-decorator'

import { Provider } from 'qn-fe-core/di'
import { useLocalStore } from 'qn-fe-core/local-store'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'

import { ModalStore } from 'admin-base/common/utils/modal'
import { ToasterStore } from 'admin-base/common/toaster'

import { Spacer } from 'libs/layout-element'
import Container from 'components/common/Container'
import { timeFormatter } from 'utils/time'
import commonStyle from 'utils/style.m.less'
import { wwwHost } from 'constants/env'
import { stateMap, dateFormat, StateType } from 'constants/activity'
import { EditorStatus } from 'constants/editor'
import { IActivityWithId } from 'apis/activity'

import CopyUrlButton from './CopyUrlButton'
import ActivityStore from './store'
import EditorModal, { ExtraProps } from './Editor'
import style from './style.m.less'

// 表格数据一页条数
export const pageSize = 5

@injectable()
class LocalStore extends Store {

  constructor(
    public activityStore: ActivityStore,
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
      this.activityStore.refresh()
    ).then(() => this.updateCurrentPage(page || 1))
  }

  @autobind
  add() {
    this.editorModal.open({ status: EditorStatus.Creating }).then(() => this.refresh())
  }

  @autobind
  edit(id: string) {
    const activity = this.activityStore.list.find(item => item._id === id)
    this.editorModal.open(
      { activity, id, status: EditorStatus.Editing }
    ).then(() => this.refresh(this.currentPage))
  }

  @autobind
  read(id: string) {
    const activity = this.activityStore.list.find(item => item._id === id)
    this.editorModal.open({ activity, id, status: EditorStatus.Reading })
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

  @autobind
  @ToasterStore.handle()
  createScanner() {
    return this.activityStore.createScanner()
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
  const { total, list, isLoading } = activityStore

  const renderState = (_: string, record: IActivityWithId) => stateMap[record.state]
  const renderTime = (_: string, record: IActivityWithId) => timeFormatter(dateFormat)(record.startTime) + ' 至 ' + timeFormatter(dateFormat)(record.endTime)
  const renderOperation = (_: string, record: IActivityWithId) => (
    <div className={commonStyle.operation}>
      <Tooltip title="详情">
        <a onClick={() => store.read(record._id)}>
          <Icon type="eye" />
        </a>
      </Tooltip>
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
  const stateFilters = Object.keys(stateMap).map(key => ({ text: stateMap[key], value: Number(key) }))
  const paginationConfig: PaginationConfig = {
    total,
    pageSize,
    current: store.currentPage
  }
  const handleTableChange = (pagination: PaginationProps, filters: { state: StateType[] }) => {
    const current = pagination.current || 1
    store.updateCurrentPage(current)
    activityStore.fetchList({ page: current, states: filters.state })
  }

  const handleShowUrl = useCallback(() => {
    store.createScanner().then(res => {
      const url = `${wwwHost}/activity/check-in/qr-code/scanner?id=${encodeURIComponent(res._id)}`
      Modal.info({
        title: '扫码签到链接',
        content: <CopyUrlButton url={url} />
      })
    })
  }, [store])
  const handleCreateScannerUrl = useCallback(() => {
    Modal.confirm({
      title: '确定生成扫码签到链接？',
      onOk: handleShowUrl
    })
  }, [handleShowUrl])

  return (
    <>
      <Container>
        <Spacer />
        <Button type="primary" onClick={handleCreateScannerUrl}>生成扫码签到链接</Button>
        <Button icon="plus" className={style.add} onClick={store.add}>添加活动</Button>
      </Container>
      <Table
        dataSource={list.slice()}
        rowKey="_id"
        loading={isLoading}
        bodyStyle={{ backgroundColor: '#fff' }}
        pagination={paginationConfig}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
      >
        <Table.Column title="活动主题" width={200} dataIndex="title" className={commonStyle.cellContent} />
        <Table.Column title="活动时间" width={300} render={renderTime} />
        <Table.Column title="更新时间" width={150} dataIndex="editTime" render={timeFormatter(dateFormat)} />
        <Table.Column title="状态" width={120} dataIndex="state" render={renderState} filters={stateFilters} />
        <Table.Column title="操作" width={120} render={renderOperation} />
      </Table>
      {store.editorModal.visible && <EditorModal {...store.editorModal.bind() as any} />}
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
