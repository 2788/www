import * as React from 'react'
import { observer } from 'mobx-react'
import { Table, Tooltip, Icon, Modal } from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'

import { IPage } from 'apis/product/page'
import PageStore from '../store'

export interface IProps {
  list: IPage[]
  isLoading: boolean
  onDelete: () => void
  onEdit(id: string): void
}

export default observer(function PageList(props: IProps) {
  const pageStore = useInjection(PageStore)
  const { list, isLoading, onDelete, onEdit } = props

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: `确定要删除产品页 ${id}？`,
      okType: 'danger',
      onOk: () => {
        pageStore.del(id).then(() => onDelete())
      }
    })
  }
  const handleEdit = (id: string) => {
    onEdit(id)
  }
  const renderOperation = (_: string, record: IPage) => (
    <>
      <Tooltip title="编辑">
        <a onClick={() => handleEdit(record.id)}>
          <Icon type="edit" />
        </a>
      </Tooltip>
      <Tooltip title="删除">
        <a
          onClick={() => handleDelete(record.id)}
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
      rowKey="id"
      loading={isLoading}
      bodyStyle={{ backgroundColor: '#fff' }}
      pagination={false}
      scroll={{ x: 'max-content', y: 320 }}
    >
      <Table.Column title="页面 ID" width={120} dataIndex="id" />
      <Table.Column title="页面名称" width={200} dataIndex="name" />
      <Table.Column title="链接地址" width={200} dataIndex="link" />
      <Table.Column title="操作" width={100} render={renderOperation} />
    </Table>
  )
})
