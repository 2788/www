/**
 * @file          component  Product News
 * @description   产品动态配置页面
 * @author        renpanpan
 */

import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Tooltip, Button, Icon, Modal } from 'react-icecream-1'
import Table, { PaginationConfig } from 'react-icecream-1/lib/table'
import { PaginationProps } from 'react-icecream-1/lib/pagination'

import { Provider, useInjection } from 'qn-fe-core/di'
import { useLocalStore } from 'qn-fe-core/local-store'

import { Spacer } from 'libs/layout-element'
import Container from 'components/common/Container'
import { INewsWithId, NewsType } from 'apis/product/news'
import { timeFormatter } from 'utils/time'
import commonStyle from 'utils/style.m.less'

import NewsStore from './store'
import EditorModal from './Editor'
import style from './style.m.less'

// 表格数据一页条数
export const pageSize = 5

// 动态类型 text
export const newsTypeTextMap = {
  [NewsType.NewProduct]: '新产品',
  [NewsType.NewFeature]: '新功能',
  [NewsType.NewRegion]: '新区域',
  [NewsType.ExperienceBetter]: '体验优化'
} as const

// 动态类型 array
export const newsTypeArr = [
  NewsType.NewProduct, NewsType.NewFeature, NewsType.NewRegion, NewsType.ExperienceBetter
] as const

const PageContent = observer(function _PageContent() {
  const store = useInjection(NewsStore)
  const { total, list, pageList, isLoading } = store

  const renderProduct = useCallback((product: string) => {
    const page = pageList.find(item => item.id === product)
    return page ? page.name : product
  }, [pageList])

  const handleDelete = useCallback((id: string) => {
    Modal.confirm({
      title: '确定删除？',
      okType: 'danger',
      onOk: () => store.handleDelete(id)
    })
  }, [store])
  const renderOperation = useCallback((_: unknown, record: INewsWithId) => (
    <div className={commonStyle.operation}>
      <Tooltip title="编辑">
        <a onClick={() => store.handleEdit(record._id)}><Icon type="edit" /></a>
      </Tooltip>
      <Tooltip title="删除">
        <a onClick={() => handleDelete(record._id)}><Icon type="delete" /></a>
      </Tooltip>
    </div>
  ), [handleDelete, store])

  // 筛选
  const productFilters = useMemo(() => pageList.map(item => ({ text: item.name, value: item.id })), [pageList])
  const filterProduct = useCallback((value: string, record: INewsWithId) => record.product === value, [])
  const typeFilters = useMemo(() => newsTypeArr.map(type => ({ text: newsTypeTextMap[type], value: type })), [])
  const filterType = useCallback((value: NewsType, record: INewsWithId) => record.type === value, [])
  // 分页
  const paginationConfig: PaginationConfig = useMemo(() => ({
    total,
    pageSize,
    current: store.currentPage
  }), [store.currentPage, total])
  const handleTableChange = useCallback((pag: PaginationProps, filters: { product: string[], type: NewsType[] }) => {
    const current = pag.current || 1
    store.updateCurrentPage(current)
    store.handleFetchList({ page: current, products: filters.product, types: filters.type })
  }, [store])

  return (
    <>
      <Container>
        <Spacer />
        <Button icon="plus" onClick={store.handleAdd}>添加动态</Button>
      </Container>
      <Table
        dataSource={list.slice()}
        rowKey="_id"
        loading={isLoading}
        bodyStyle={{ backgroundColor: '#fff' }}
        pagination={paginationConfig}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
        className={style.table}
      >
        <Table.Column title="所属产品" width={120} className={commonStyle.cellContent} dataIndex="product" render={renderProduct} filters={productFilters} onFilter={filterProduct} />
        <Table.Column title="动态类型" width={150} dataIndex="type" render={(type: NewsType) => newsTypeTextMap[type]} filters={typeFilters} onFilter={filterType} />
        <Table.Column title="发布时间" width={120} dataIndex="releaseTime" render={timeFormatter('YYYY-MM-DD')} />
        <Table.Column title="动态标题" width={150} className={commonStyle.cellContent} dataIndex="title" />
        <Table.Column title="动态描述" width={250} className={commonStyle.cellContent} dataIndex="desc" />
        <Table.Column title="相关文档链接" width={200} className={commonStyle.cellContent} dataIndex="link" />
        <Table.Column title="操作" width={120} render={renderOperation} />
      </Table>
      <EditorModal {...store.editorModal.bind() as any} />
    </>
  )
})

export default function News() {
  const store = useLocalStore(NewsStore)
  return (
    <Provider provides={[{ identifier: NewsStore, value: store }]} >
      <PageContent />
    </Provider>
  )
}
