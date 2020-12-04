import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Tooltip, Icon, Modal } from 'react-icecream'
import Table, { PaginationConfig } from 'react-icecream/lib/table'
import { useInjection } from 'qn-fe-core/di'
import { INotice, INoticeWithId } from 'apis/product/notice'
import { IPage } from 'apis/product/page'
import { timeFormatter } from 'utils/time'

import { renderState } from 'components/common/State'
import NoticeStore from '../store'
import { typeMap } from '..'
import * as style from './style.m.less'

const pageSize = 5
export interface IProps {
  list: INotice[]
  pageList: IPage[]
  isLoading: boolean
  onDelete: () => void
  onEdit(id: string): void
}

export default observer(function NoticeList(props: IProps) {
  const noticeStore = useInjection(NoticeStore)
  const { list, pageList, isLoading, onDelete, onEdit } = props
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确定删除？',
      okType: 'danger',
      onOk: () => {
        noticeStore.del(id).then(() => onDelete())
      }
    })
  }
  const handleEdit = (id: string) => {
    onEdit(id)
  }

  const renderProduct = (_: string, record: INotice) => {
    const page = pageList.find(item => item.id === record.product)
    return page ? page.name : record.product
  }
  const renderType = (_: string, record: INotice) => typeMap[record.type]
  const renderTime = (_: string, record: INotice) => timeFormatter('YYYY-MM-DD')(record.effectTime) + ' 至 ' + timeFormatter('YYYY-MM-DD')(record.invalidTime)
  const renderOperation = (_: string, record: INoticeWithId) => (
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

  // 筛选
  const productFilters = pageList.map(item => ({ text: item.name, value: item.id }))
  const typeFilters = Object.keys(typeMap).map(key => ({ text: typeMap[key], value: key }))
  const filterProduct = (value: string, record: INotice) => record.product === value
  const filterType = (value: string, record: INotice) => record.type === value
  // 排序
  const sortEditTime = (a: INotice, b: INotice) => a.editTime - b.editTime
  const pagination: PaginationConfig = {
    pageSize,
    current: currentPage,
    onChange: setCurrentPage
  }

  return (
    <Table
      dataSource={list.slice()}
      rowKey="_id"
      loading={isLoading}
      bodyStyle={{ backgroundColor: '#fff' }}
      pagination={pagination}
      scroll={{ x: 'max-content' }}
      className={style.table}
    >
      <Table.Column title="所在产品页" width={120} className={style.content} dataIndex="product" render={renderProduct} filters={productFilters} onFilter={filterProduct} />
      <Table.Column title="摘要" width={120} className={style.content} dataIndex="summary" />
      <Table.Column title="跳转链接" width={200} className={style.content} dataIndex="link" />
      <Table.Column title="类型" width={100} dataIndex="type" render={renderType} filters={typeFilters} onFilter={filterType} />
      <Table.Column title="状态" width={100} render={renderState} />
      <Table.Column title="生效时间段" width={240} render={renderTime} />
      <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} sorter={sortEditTime} />
      <Table.Column title="操作" width={80} render={renderOperation} />
    </Table>
  )
})
