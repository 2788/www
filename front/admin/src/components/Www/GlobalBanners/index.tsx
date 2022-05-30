/**
 * @file          component  GlobalBanners
 * @description   全局公告配置页面
 * @author        renpanpan
 */

import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Tooltip, Button, Icon, Modal } from 'react-icecream-1'
import Table, { PaginationConfig } from 'react-icecream-1/lib/table'

import { useLocalStore } from 'qn-fe-core/local-store'

import { Spacer } from 'libs/layout-element'
import { IBannerWithId } from 'apis/global-banner'
import { timeFormatter } from 'utils/time'
import commonStyle from 'utils/style.m.less'
import Container from 'components/common/Container'
import ImgPreview from 'components/common/ImgPreview'
import { StateCheckboxGroup, renderState } from 'components/common/State'

import BannersStore from './store'
import EditorModal from './EditorModal'
import style from './style.m.less'
import { displayPagesTextMap } from './constants'

// 表格数据一页条数
export const pageSize = 10

export default observer(function GlobalBanners() {
  const store = useLocalStore(BannersStore)
  const { filteredList, isLoading } = store

  const renderImg = (url: string, width: number, height: number) => (
    <ImgPreview url={url} type="cover" width={width} height={height} />
  )

  const renderOthers = (_: string, record: IBannerWithId) => (
    <>
      <h5>背景色：<div className={style.color} style={{ backgroundColor: `${record.backgroundColor}` }} /></h5>
      <h5>跳转：{record.link}</h5>
      <h5>展示区域：{record.displayPages.map(item => displayPagesTextMap[item]).join('、')}</h5>
    </>
  )
  const renderRangeTime = (_: string, record: IBannerWithId) => (
    timeFormatter('YYYY-MM-DD')(record.effectTime) + ' 至 ' + timeFormatter('YYYY-MM-DD')(record.invalidTime)
  )
  const handleDelete = useCallback((record: IBannerWithId) => {
    Modal.confirm({
      title: `确定删除公告“${record.name}”？`,
      okType: 'danger',
      onOk: () => store.handleDelete(record._id)
    })
  }, [store])
  const renderOperation = (_: string, record: IBannerWithId) => (
    <div className={commonStyle.operation}>
      <Tooltip title="编辑">
        <a onClick={() => store.handleEdit(record._id)}>
          <Icon type="edit" />
        </a>
      </Tooltip>
      <Tooltip title="删除">
        <a onClick={() => handleDelete(record)}>
          <Icon type="delete" />
        </a>
      </Tooltip>
    </div>
  )

  // 分页
  const paginationConfig: PaginationConfig = {
    pageSize,
    current: store.currentPage,
    onChange: store.updateCurrentPage
  }

  return (
    <>
      <Container>
        <StateCheckboxGroup onChange={store.updateStates} />
        <Spacer />
        <Button icon="plus" onClick={store.handleAdd}>添加全局公告</Button>
      </Container>
      <Table
        dataSource={filteredList.slice()}
        rowKey="_id"
        loading={isLoading}
        bodyStyle={{ backgroundColor: '#fff' }}
        pagination={paginationConfig}
        scroll={{ x: 'max-content' }}
      >
        <Table.Column title="公告名称" width={120} className={commonStyle.cellContent} dataIndex="name" />
        <Table.Column title="状态" width={100} render={renderState} />
        <Table.Column title="PC 端缩略图" width={150} dataIndex="pcImg" render={url => renderImg(url, 2880, 160)} />
        <Table.Column title="移动端缩略图" width={150} dataIndex="mobileImg" render={url => renderImg(url, 1125, 156)} />
        <Table.Column title="其他信息" width={200} dataIndex="others" render={renderOthers} className={commonStyle.cellContent} />
        <Table.Column title="生效时间段" width={240} render={renderRangeTime} />
        <Table.Column title="创建时间" width={120} dataIndex="createTime" render={timeFormatter('YYYY-MM-DD')} />
        <Table.Column title="更新时间" width={120} dataIndex="editTime" render={timeFormatter('YYYY-MM-DD')} />
        <Table.Column title="操作" width={80} render={renderOperation} />
      </Table>
      <EditorModal {...store.editorModal.bind() as any} />
    </>
  )
})

