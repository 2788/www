import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Tooltip, Icon, Modal } from 'react-icecream'
import Table, { PaginationConfig } from 'react-icecream/lib/table'
import { useInjection } from 'qn-fe-core/di'
import { IBanner } from 'apis/homepage/banner'
import { timeFormatter } from 'utils/time'

import { renderState } from 'components/common/State'
import ImgPreview from 'components/common/ImgPreview'
import BannerStore from '../store'
import { maxNum } from '..'
import * as style from './style.m.less'

const pageSize = 5
export interface IProps {
  list: IBanner[]
  isLoading: boolean
  onDelete: () => void
  onEdit(name: string): void
}

export default observer(function BannerList(props: IProps) {
  const bannerStore = useInjection(BannerStore)
  const { list, isLoading, onDelete, onEdit } = props
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleDelete = (name: string) => {
    Modal.confirm({
      title: '确定删除？',
      okType: 'danger',
      onOk: () => {
        bannerStore.del(name).then(() => onDelete())
      }
    })
  }
  const handleEdit = (name: string) => {
    onEdit(name)
  }

  const renderImg = (item: 'pcImg' | 'mobileImg') => (_: string, record: IBanner) => <ImgPreview url={record[item]} />

  const renderOther = (_: string, record: IBanner) => (
    <>
      <h5>背景色：<div className={style.color} style={{ backgroundColor: `${record.backgroundColor}` }} /></h5>
      <h5>跳转：{record.link}</h5>
      <h5>顺序：{record.order}</h5>
    </>
  )
  const renderTime = (_: string, record: IBanner) => timeFormatter('YYYY-MM-DD')(record.effectTime) + ' 至 ' + timeFormatter('YYYY-MM-DD')(record.invalidTime)
  const renderOperation = (_: string, record: IBanner) => (
    <>
      <Tooltip title="编辑">
        <a
          onClick={() => handleEdit(record.name)}
        >
          <Icon type="edit" />
        </a>
      </Tooltip>
      <Tooltip title="删除">
        <a
          onClick={() => handleDelete(record.name)}
          style={{ marginLeft: 16 }}
        >
          <Icon type="delete" />
        </a>
      </Tooltip>
    </>
  )

  // 筛选
  const orderFilters = Array.from({ length: maxNum }, (_, i) => ({ text: '顺序：' + (i + 1), value: i + 1 }))
  const filterOrder = (value: number, record: IBanner) => record.order === value
  // 排序
  const sortCreateTime = (a: IBanner, b: IBanner) => a.createTime - b.createTime
  const sortEditTime = (a: IBanner, b: IBanner) => a.editTime - b.editTime
  const pagination: PaginationConfig = {
    pageSize,
    current: currentPage,
    onChange: setCurrentPage
  }

  return (
    <Table
      dataSource={list.slice()}
      rowKey="name"
      loading={isLoading}
      bodyStyle={{ backgroundColor: '#fff' }}
      pagination={pagination}
      scroll={{ x: 'max-content' }}
    >
      <Table.Column title="名称" width={120} dataIndex="name" className={style.content} />
      <Table.Column title="状态" width={100} render={renderState} />
      <Table.Column title="PC 端缩略图" width={150} dataIndex="pcImg" render={renderImg('pcImg')} />
      <Table.Column title="移动端缩略图" width={150} dataIndex="mobileImg" render={renderImg('mobileImg')} />
      <Table.Column title="其他信息" width={200} dataIndex="other" render={renderOther} filters={orderFilters} onFilter={filterOrder} className={style.content} />
      <Table.Column title="生效时间段" width={240} render={renderTime} />
      <Table.Column title="创建时间" width={120} dataIndex="createTime" render={timeFormatter('YYYY-MM-DD')} sorter={sortCreateTime} />
      <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} sorter={sortEditTime} />
      <Table.Column title="操作" width={80} render={renderOperation} />
    </Table>
  )
})
