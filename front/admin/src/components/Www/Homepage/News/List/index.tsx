import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Tooltip, Icon } from 'react-icecream'
import Table, { PaginationConfig } from 'react-icecream/lib/table'
import { INews, INewsWithId } from 'apis/homepage/news'
import { timeFormatter } from 'utils/time'
import ImgPreview from 'components/common/ImgPreview'
import { maxNum } from '..'
import * as style from './style.m.less'

const pageSize = 5
export interface IProps {
  list: INews[]
  isLoading: boolean
  onEdit(id: string): void
}

export default observer(function NewsList(props: IProps) {
  const { list, isLoading, onEdit } = props
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleEdit = (id: string) => {
    onEdit(id)
  }

  const renderBanner = (_: string, record: INews) => <ImgPreview url={record.banner} />
  const renderOperation = (_: string, record: INewsWithId) => (
    <Tooltip title="更换">
      <a
        // eslint-disable-next-line no-underscore-dangle
        onClick={() => handleEdit(record._id)}
      >
        <Icon type="edit" />
      </a>
    </Tooltip>
  )

  // 筛选
  const orderFilters = Array.from({ length: maxNum }, (_, i) => ({ text: i + 1, value: i + 1 }))
  const filterOrder = (value: number, record: INews) => record.order === value
  // 排序
  const sortEditTime = (a: INews, b: INews) => a.editTime - b.editTime
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
    >
      <Table.Column title="展示顺序" width={100} dataIndex="order" filters={orderFilters} onFilter={filterOrder} />
      <Table.Column title="文章 ID" width={100} dataIndex="articleId" />
      <Table.Column title="资讯标题" width={200} dataIndex="title" />
      <Table.Column title="资讯 banner" width={150} render={renderBanner} />
      <Table.Column title="跳转链接" width={200} dataIndex="link" className={style.content} />
      <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} sorter={sortEditTime} />
      <Table.Column title="操作" width={80} render={renderOperation} />
    </Table>
  )
})
