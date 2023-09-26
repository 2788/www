import React, { useCallback } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Modal, Button } from 'react-icecream-1'
import Table, { PaginationConfig } from 'react-icecream-1/lib/table'
import { PaginationProps } from 'react-icecream-1/lib/pagination'
import autobind from 'autobind-decorator'

import { Provider } from 'qn-fe-core/di'
import { Route, Switch } from 'qn-fe-core/router'
import { useLocalStore } from 'qn-fe-core/local-store'
import Store, { observeInjectable as injectable } from 'qn-fe-core/store'

import { ModalStore } from 'admin-base/common/utils/modal'
import { ToasterStore } from 'admin-base/common/toaster'
import { ButtonLink } from 'admin-base/common/components/Link'

import { Spacer } from 'libs/layout-element'
import Container from 'components/common/Container'
import { timeFormatter } from 'utils/time'
import commonStyle from 'utils/style.m.less'
import { wwwHost } from 'constants/env'
import { stateMap, dateFormat, StateType } from 'constants/activity'
import { EditorStatus } from 'constants/editor'
import { IActivityWithId } from 'apis/activity/market'

import EditorModal, { ExtraProps } from './ActivityEditor'
import CopyUrlButton from './CopyUrlButton'
import PageEditor from './PageEditor'
import ActivityStore from './store'
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
  @observable.ref currentPage = 1
  infoEditorModal = new ModalStore<ExtraProps>()

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
    this.infoEditorModal.open({ status: EditorStatus.Creating }).then(() => this.refresh())
  }

  @autobind
  editInfo(id: string) {
    const activity = this.activityStore.list.find(item => item._id === id)
    this.infoEditorModal.open(
      { activity, id, status: EditorStatus.Editing }
    ).then(() => this.refresh(this.currentPage))
  }

  @autobind
  readInfo(id: string) {
    const activity = this.activityStore.list.find(item => item._id === id)
    this.infoEditorModal.open({ activity, id, status: EditorStatus.Reading })
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
      () => this.infoEditorModal.dispose()
    )
    this.refresh()
  }
}

const ActivityList = observer(function _ActivityList() {
  const store = useLocalStore(LocalStore)
  const activityStore = store.activityStore
  const { total, list, isLoading } = activityStore

  const renderState = (_: string, record: IActivityWithId) => stateMap[record.state]
  const renderTime = (_: string, record: IActivityWithId) => timeFormatter(dateFormat)(record.startTime) + ' 至 ' + timeFormatter(dateFormat)(record.endTime)
  const renderOperation = (_: string, record: IActivityWithId) => (
    <div className={style.operations}>
      <Button type="link" onClick={() => { store.readInfo(record._id) }}>查看信息</Button>
      <Button type="link" onClick={() => { store.editInfo(record._id) }}>修改信息</Button>
      {!record.detail && (<ButtonLink type="link" relative to={`${record._id}`}>编辑页面</ButtonLink>)}
      <Button type="link" onClick={() => { store.handleDelete(record._id) }}>删除</Button>
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
        <Table.Column title="操作" width={180} render={renderOperation} />
      </Table>
      {store.infoEditorModal.visible && <EditorModal {...store.infoEditorModal.bind() as any} />}
    </>
  )
})

export default function Activity() {
  return (
    <Provider provides={[{ identifier: ActivityStore, constr: ActivityStore }]} >
      <Switch>
        <Route path="/" relative exact>
          <ActivityList />
        </Route>
        <Route
          path=":id"
          relative
          component={({ match: { params: { id } } }) => (
            <PageEditor id={id} />
          )}
        />
      </Switch>
    </Provider>
  )
}
