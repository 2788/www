/**
 * @file          component  Product Prices
 * @description   产品价格页配置页面
 * @author        renpanpan
 */

import React, { useCallback, useMemo, useRef } from 'react'
import { observer } from 'mobx-react'
import { Tooltip, Button, Icon, Modal } from 'react-icecream-1'
import Table, { PaginationConfig } from 'react-icecream-1/lib/table'
import { saveAs } from 'file-saver'

import { Provider, useInjection } from 'qn-fe-core/di'
import { useLocalStore } from 'qn-fe-core/local-store'

import { Spacer } from 'libs/layout-element'
import Container from 'components/common/Container'
import { IPrice } from 'apis/product/price'
import { timeFormatter } from 'utils/time'
import commonStyle from 'utils/style.m.less'

import UploadMdFile, * as uploadMdFile from './UploadMdFile'
import PricesStore from './store'
import CreateModal from './Create'
import VersionsModal from './Versions'
import style from './style.m.less'

// 表格数据一页条数
export const pageSize = 10

function ImmutableUploadMdFile(props: Omit<uploadMdFile.Props, 'state'>) {
  const ref = useRef(uploadMdFile.createState())
  return (
    <UploadMdFile state={ref.current} {...props} />
  )
}

const PageContent = observer(function _PageContent() {
  const store = useInjection(PricesStore)
  const { list, pageList, pageMap, isLoading } = store

  const renderProduct = useCallback((product: string) => (
    pageMap.get(product) || '-'
  ), [pageMap])
  const renderFile = useCallback((_: unknown, record: IPrice) => (
    <a onClick={() => saveAs(record.fileUrl, record.fileName)}> {record.fileName}</a >
  ), [])

  const handleDelete = useCallback((id: string) => {
    Modal.confirm({
      title: '确定删除？',
      okType: 'danger',
      onOk: () => store.handleDelete(id)
    })
  }, [store])
  const renderOperation = useCallback((_: unknown, record: IPrice) => (
    <div className={commonStyle.operation}>
      <Tooltip title="查看历史修订记录">
        <a onClick={() => store.handleShowVersions(record.product)}>
          <Icon type="eye" />
        </a>
      </Tooltip>
      <ImmutableUploadMdFile
        onUploaded={(url, file) => store.handleAddNewVersion(record, url, file.name)}
      >
        <Tooltip title="上传新版本">
          <a><Icon type="upload" /></a>
        </Tooltip>
      </ImmutableUploadMdFile>
      <Tooltip title="删除">
        <a onClick={() => handleDelete(record.product)}><Icon type="delete" /></a>
      </Tooltip>
    </div>
  ), [handleDelete, store])

  // 筛选
  const productFilters = useMemo(() => pageList.map(item => ({ text: item.name, value: item.id })), [pageList])
  const filterProduct = useCallback((value: string, record: IPrice) => record.product === value, [])
  // 分页
  const paginationConfig: PaginationConfig = {
    pageSize,
    current: store.currentPage,
    onChange: store.updateCurrentPage
  }

  return (
    <>
      <Container>
        <Spacer />
        <Button icon="table" className={style.tableBtn} href="https://www.tablesgenerator.com/html_tables" target="_blank">表格生成</Button>
        <Button icon="plus" onClick={store.handleAdd}>添加价格页</Button>
      </Container>
      <Table
        dataSource={list.slice()}
        rowKey="product"
        loading={isLoading}
        bodyStyle={{ backgroundColor: '#fff' }}
        pagination={paginationConfig}
        scroll={{ x: 'max-content' }}
        className={style.table}
      >
        <Table.Column title="所属产品" width={120} className={commonStyle.cellContent} dataIndex="product" render={renderProduct} filters={productFilters} onFilter={filterProduct} />
        <Table.Column title="文件" dataIndex="file" className={commonStyle.cellContent} render={renderFile} />
        <Table.Column title="创建人" width={100} dataIndex="creator" render={(val: string) => val || '-'} />
        <Table.Column title="更新人" width={100} dataIndex="modifier" render={(val: string) => val || '-'} />
        <Table.Column title="更新时间" width={160} dataIndex="updatedAt" render={timeFormatter('YYYY-MM-DD HH:mm')} />
        <Table.Column title="操作" width={140} render={renderOperation} />
      </Table>
      <CreateModal {...store.createModal.bind()} />
      <VersionsModal {...store.versionsModal.bind() as any} />
    </>
  )
})

export default function Prices() {
  const store = useLocalStore(PricesStore)
  return (
    <Provider provides={[{ identifier: PricesStore, value: store }]} >
      <PageContent />
    </Provider>
  )
}
