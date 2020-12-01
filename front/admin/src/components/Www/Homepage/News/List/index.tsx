import * as React from 'react'
import { observer } from 'mobx-react'
import { Table, Tooltip, Icon } from 'react-icecream'

import { INews, INewsWithId } from 'apis/homepage/news'
import { timeFormatter } from 'utils/time'
import ImgPreview from 'components/common/ImgPreview'
import * as style from './style.m.less'

export interface IProps {
  list: INews[]
  isLoading: boolean
  onEdit(id: string): void
}

export default observer(function NewsList(props: IProps) {
  const { list, isLoading, onEdit } = props

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

  return (
    <Table
      dataSource={list.slice()}
      rowKey="_id"
      loading={isLoading}
      bodyStyle={{ backgroundColor: '#fff' }}
      pagination={false}
      scroll={{ x: 'max-content', y: 320 }}
    >
      <Table.Column title="展示顺序" width={100} dataIndex="order" />
      <Table.Column title="文章 ID" width={100} dataIndex="articleId" />
      <Table.Column title="资讯标题" width={200} dataIndex="title" />
      <Table.Column title="资讯 banner" width={150} render={renderBanner} />
      <Table.Column title="跳转链接" width={200} dataIndex="link" className={style.content} />
      <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} />
      <Table.Column title="操作" width={80} render={renderOperation} />
    </Table>
  )
})
