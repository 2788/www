/**
 * @file banner list
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useEffect, useState, useCallback } from 'react'
import { Table, TableType, Button, Tooltip, Popover } from 'react-icecream-2'
import { EditIcon, DeleteIcon } from 'react-icecream-2/icons'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { Banner, bannerSize } from 'constants/pgc/content-banner'
import { timeFormatter } from 'utils/time'
import { getStateName } from 'utils/check'
import PgcContentBannerApis from 'apis/pgc/content-banner'
import ImgPreview from 'components/common/ImgPreview'

import { useEditModal } from './modal-form'

import style from './list.m.less'

const PgcBannerTable: TableType<Banner> = Table

export function usePgcBannerList() {
  const toasterStore = useInjection(ToasterStore)
  const pgcContentBannerApis = useInjection(PgcContentBannerApis)

  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState<Banner[]>([])

  const refresh = useCallback(() => {
    setIsLoading(true)
    toasterStore.promise(
      pgcContentBannerApis.listAll()
        .then(result => {
          setList(result)
        })
        .finally(() => { setIsLoading(false) })
    )
  }, [pgcContentBannerApis, toasterStore])

  useEffect(() => {
    refresh()
  }, [refresh])

  const [openEditModal, editModalView] = useEditModal(list, refresh)

  async function deleteBanner(id: string) {
    await toasterStore.promise(pgcContentBannerApis.client.delete(id))
    refresh()
  }

  function renderOperations(index: number) {
    const record = list[index]
    return (
      <div className={style.operations}>
        <Tooltip title="编辑">
          <Button type="link" onClick={() => { openEditModal(index) }}>
            <EditIcon />
          </Button>
        </Tooltip>
        <Tooltip title="删除">
          <Popover
            trigger="click"
            placement="left"
            content="确认删除？"
            buttons={{ onOk() { deleteBanner(record.id) } }}
            icon
          >
            <Button type="link">
              <DeleteIcon />
            </Button>
          </Popover>
        </Tooltip>
      </div>
    )
  }

  const tableView = (
    <PgcBannerTable
      records={list}
      recordIdAccessor="id"
      pagination={false}
      loading={isLoading}
    >
      <PgcBannerTable.Column
        title="名称"
        accessor="name"
      />
      <PgcBannerTable.Column
        title="状态"
        id="status"
        render={(_, record) => getStateName(record)}
      />
      <PgcBannerTable.Column
        title="banner"
        accessor="img"
        render={url => (<ImgPreview url={url} type="cover" {...bannerSize.preview} />)}
      />
      <PgcBannerTable.Column
        title="跳转地址"
        accessor="link"
        // eslint-disable-next-line react/jsx-no-target-blank
        render={link => (<div className={style.link}><a href={link} target="_blank">{link}</a></div>)}
      />
      <PgcBannerTable.Column
        title="顺序"
        accessor="order"
      />
      <PgcBannerTable.Column
        title="生效时间段"
        id="date-range"
        render={(_, { effectTime, invalidTime }) => (
          <div>
            {timeFormatter('YYYY-MM-DD')(effectTime)}
            <span> 至 </span>
            {timeFormatter('YYYY-MM-DD')(invalidTime)}
          </div>
        )}
      />
      <PgcBannerTable.Column
        title="更新时间"
        accessor="updatedAt"
        render={updatedAt => timeFormatter()(updatedAt)}
      />
      <PgcBannerTable.Column
        title="操作"
        id="operations"
        render={(_, __, index) => renderOperations(index)}
      />
    </PgcBannerTable>
  )

  const listView = (
    <>
      {tableView}
      {editModalView}
    </>
  )

  return {
    list,
    isLoading,
    refresh,
    listView
  }
}
