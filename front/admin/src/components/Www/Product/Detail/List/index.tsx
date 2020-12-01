import * as React from 'react'
import { observer } from 'mobx-react'
import { Table, Tooltip, Icon, Modal } from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'
import { IDetail, IDetailWithId } from 'apis/product/detail'
import { IPage } from 'apis/product/page'
import { timeFormatter } from 'utils/time'

import { renderState } from 'components/common/State'
import DetailStore from '../store'
import * as style from './style.m.less'
import { typeMap } from '..'

export interface IProps {
  list: IDetail[]
  pageList: IPage[]
  isLoading: boolean
  onDelete: () => void
  onEdit(id: string): void
}

export default observer(function DetailList(props: IProps) {
  const detailStore = useInjection(DetailStore)
  const { list, pageList, isLoading, onDelete, onEdit } = props

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确定删除？',
      okType: 'danger',
      onOk: () => {
        detailStore.del(id).then(() => onDelete())
      }
    })
  }
  const handleEdit = (id: string) => {
    onEdit(id)
  }

  const renderProduct = (_: string, record: IDetail) => {
    const page = pageList.find(item => item.id === record.product)
    return page ? page.name : record.product
  }
  const renderType = (_: string, record: IDetail) => typeMap[record.type]
  const renderTime = (_: string, record: IDetail) => timeFormatter('YYYY-MM-DD')(record.effectTime) + ' 至 ' + timeFormatter('YYYY-MM-DD')(record.invalidTime)
  const renderOperation = (_: string, record: IDetailWithId) => (
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
      <Table.Column title="所在产品页" width={120} className={style.content} render={renderProduct} />
      <Table.Column title="摘要" width={120} className={style.content} dataIndex="summary" />
      <Table.Column title="跳转链接" width={200} className={style.content} dataIndex="link" />
      <Table.Column title="类型" width={100} render={renderType} />
      <Table.Column title="状态" width={100} render={renderState} />
      <Table.Column title="生效时间段" width={240} render={renderTime} />
      <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} />
      <Table.Column title="操作" width={80} render={renderOperation} />
    </Table>
  )
})
