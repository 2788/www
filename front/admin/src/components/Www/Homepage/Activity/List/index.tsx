import * as React from 'react'
import { observer } from 'mobx-react'
import { Table, Tooltip, Icon, Modal } from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'
import { IActivity, IActivityWithId } from 'apis/homepage/activity'
import { timeFormatter } from 'utils/time'

import { renderState } from 'components/common/State'
import ImgPreview from 'components/common/ImgPreview'
import ActivityStore from '../store'
import { labelMap } from '../RadioInput'
import * as style from './style.m.less'

export interface IProps {
  list: IActivity[]
  isLoading: boolean
  onDelete: () => void
  onEdit(id: string): void
}

export default observer(function ActivityList(props: IProps) {
  const activityStore = useInjection(ActivityStore)
  const { list, isLoading, onDelete, onEdit } = props

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确定删除？',
      okType: 'danger',
      onOk: () => {
        activityStore.del(id).then(() => onDelete())
      }
    })
  }
  const handleEdit = (id: string) => {
    onEdit(id)
  }

  const renderImg = (_: string, record: IActivity) => <ImgPreview url={record.icon} />
  const renderOther = (_: string, record: IActivity) => (
    <>
      <h5>跳转：{record.link}</h5>
      <h5>标签：{labelMap[record.label] ? labelMap[record.label] : record.label}</h5>
      <h5>顺序：{record.order}</h5>
    </>
  )
  const renderTime = (_: string, record: IActivity) => timeFormatter('YYYY-MM-DD')(record.effectTime) + ' 至 ' + timeFormatter('YYYY-MM-DD')(record.invalidTime)
  const renderOperation = (_: string, record: IActivityWithId) => (
    <>
      <Tooltip title="编辑">
        <a
          // eslint-disable-next-line no-underscore-dangle
          onClick={() => handleEdit(record._id)}
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

  return (
    <Table
      dataSource={list.slice()}
      rowKey="_id"
      loading={isLoading}
      bodyStyle={{ backgroundColor: '#fff' }}
      pagination={false}
      scroll={{ x: 'max-content', y: 320 }}
    >
      <Table.Column title="序号" width={80} render={(_text, _record, index) => index + 1} />
      <Table.Column title="标题" width={120} dataIndex="title" className={style.content} />
      <Table.Column title="副标题" width={120} dataIndex="subTitle" className={style.content} />
      <Table.Column title="状态" width={100} render={renderState} />
      <Table.Column title="icon" width={100} render={renderImg} />
      <Table.Column title="其他信息" width={200} render={renderOther} className={style.content} />
      <Table.Column title="生效时间段" width={240} render={renderTime} />
      <Table.Column title="创建时间" width={120} dataIndex="createTime" render={timeFormatter('YYYY-MM-DD')} />
      <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} />
      <Table.Column title="操作" width={80} render={renderOperation} />
    </Table>
  )
})
