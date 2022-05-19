/**
 * @file 内容站 - 首页轮播图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { Button } from 'react-icecream-2'
import { AddThinIcon } from 'react-icecream-2/icons'

import { useAddModal } from './modal-form'
import { usePgcBannerList } from './list'

import style from './style.m.less'

export default function PgcBanner() {
  const { list, isLoading, refresh, listView } = usePgcBannerList()
  const [openAddModal, addModalView] = useAddModal(list, refresh)

  return (
    <div>
      <div className={style.panel}>
        <Button loading={isLoading} onClick={() => { refresh() }}>刷新</Button>
        <Button type="primary" icon={<AddThinIcon />} onClick={() => { openAddModal() }}>添加</Button>
      </div>
      {listView}
      {addModalView}
    </div>
  )
}
