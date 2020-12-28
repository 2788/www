import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Tooltip, Icon, Modal } from 'react-icecream'
import Table, { PaginationConfig } from 'react-icecream/lib/table'
import { PaginationProps } from 'react-icecream/lib/pagination'
import { useInjection } from 'qn-fe-core/di'
import { IActivity, IActivityWithId } from 'apis/activity'
import { timeFormatter } from 'utils/time'
import { stateMap, dateFormat, pageSize, StateType } from 'constants/activity'
import ActivityStore from '../store'
import * as style from './style.m.less'

export interface IProps {
  total: number
  list: IActivity[]
  isLoading: boolean
  onDelete: () => void
  onEdit(id: string): void
  onShowDetail(id: string): void
}

export default observer(function ActivityList(props: IProps) {
  const activityStore = useInjection(ActivityStore)
  const { total, list, isLoading, onDelete, onEdit, onShowDetail } = props
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确定删除？',
      okType: 'danger',
      onOk: () => {
        activityStore.del(id).then(() => onDelete())
      }
    })
  }

  const renderState = (_: string, record: IActivity) => stateMap[record.state]
  const renderTime = (_: string, record: IActivity) => timeFormatter(dateFormat)(record.startTime) + ' 至 ' + timeFormatter(dateFormat)(record.endTime)
  const renderOperation = (_: string, record: IActivityWithId) => (
    <>
      <Tooltip title="详情">
        <a
          // eslint-disable-next-line no-underscore-dangle
          onClick={() => onShowDetail(record._id)}
        >
          <Icon type="eye" />
        </a>
      </Tooltip>
      <Tooltip title="编辑">
        <a
          // eslint-disable-next-line no-underscore-dangle
          onClick={() => onEdit(record._id)}
          style={{ marginLeft: 16 }}
        >
          <Icon type="edit" />
        </a>
      </Tooltip>
      <Tooltip title="删除">
        <a
          // eslint-disable-next-line no-underscore-dangle
          onClick={() => handleDelete(record._id)}
          style={{ marginLeft: 16 }}
        >
          <Icon type="delete" />
        </a>
      </Tooltip>
    </>
  )

  // 筛选
  const stateFilters = Object.keys(stateMap).map(key => ({ text: stateMap[key], value: Number(key) }))
  const paginationConfig: PaginationConfig = {
    total,
    pageSize,
    current: currentPage
  }
  const handleTableChange = (pagination: PaginationProps, filters: { state: StateType[] }) => {
    const current = pagination.current || 1
    setCurrentPage(current)
    activityStore.fetchList({ page: current, states: filters.state })
  }

  return (
    <Table
      dataSource={list.slice()}
      rowKey="_id"
      loading={isLoading}
      bodyStyle={{ backgroundColor: '#fff' }}
      pagination={paginationConfig}
      onChange={handleTableChange}
      scroll={{ x: 'max-content' }}
    >
      <Table.Column title="活动主题" width={200} dataIndex="title" className={style.content} />
      <Table.Column title="活动时间" width={300} render={renderTime} />
      <Table.Column title="更新时间" width={150} dataIndex="editTime" render={timeFormatter(dateFormat)} />
      <Table.Column title="状态" width={120} dataIndex="state" render={renderState} filters={stateFilters} />
      <Table.Column title="操作" width={120} render={renderOperation} />
    </Table>
  )
})
