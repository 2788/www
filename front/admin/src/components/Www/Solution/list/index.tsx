/**
 * @file 列表
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Table, TableType, TablePaginationOptions, Button, Tooltip } from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'
import { ButtonLink } from 'admin-base/common/components/Link'
import { ShareIcon } from 'react-icecream/icons'

import { timeFormatter } from 'utils/time'
import { SolutionId, wwwSolutionPathPrefix } from 'constants/solution'
import { getSolutionPageUrl, hasSolutionPage } from 'transforms/solution'
import SolutionApis, { SolutionInfo } from 'apis/solution'
import { wwwHost } from 'constants/env'

import styles from './style.m.less'

const SolutionTable: TableType<SolutionInfo> = Table

function useSolutionListState() {
  const toasterStore = useInjection(ToasterStore)
  const solutionApis = useInjection(SolutionApis)

  const [isLoading, setIsLoading] = useState(true)
  const [records, setRecords] = useState<SolutionInfo[]>([])

  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(0)
  const pagination = useMemo<TablePaginationOptions>(() => ({
    currentPage,
    pageSize,
    total: totalPage,
    onChange(nextPage, nextPageSize) {
      setCurrentPage(nextPage)
      setPageSize(nextPageSize)
    }
  }), [currentPage, pageSize, totalPage])

  const fetchList = useCallback(() => {
    setIsLoading(true)
    toasterStore.promise(
      solutionApis.list({ currentPage, pageSize })
        .then(result => {
          setRecords(result.data)
          setTotalPage(result.count)
        })
        .finally(() => { setIsLoading(false) })
    )
  }, [solutionApis, toasterStore, currentPage, pageSize])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  return {
    records,
    isLoading,
    pagination,
    refresh: fetchList
  }
}

export default function useSolutionList(editMetaInfo: (solutionId: SolutionId) => void) {
  const { records, isLoading, pagination, refresh } = useSolutionListState()

  const listView = (
    <SolutionTable
      records={records}
      recordIdAccessor="path"
      pagination={pagination}
      loading={isLoading}
    >
      <SolutionTable.Column
        title="地址"
        accessor="path"
        render={(path, record) => (
          <>
            <span>{wwwSolutionPathPrefix}{path} </span>
            {hasSolutionPage(record) && (
              <Tooltip title="新 Tab 页访问">
                <ButtonLink
                  type="link"
                  size="small"
                  to={wwwHost + wwwSolutionPathPrefix + path}
                  target="_blank"
                  className={styles.shareBtn}
                >
                  <ShareIcon />
                </ButtonLink>
              </Tooltip>
            )}
          </>
        )}
      />
      <SolutionTable.Column
        title="名称"
        accessor="name"
      />
      <SolutionTable.Column
        title="更新时间"
        accessor="updatedAt"
        render={updatedAt => timeFormatter()(updatedAt)}
      />
      <SolutionTable.Column
        title="操作"
        render={(_, { path }) => (
          <div className={styles.operations}>
            <Button type="link" onClick={() => { editMetaInfo(path) }}>修改信息</Button>
            <ButtonLink type="link" to={getSolutionPageUrl(path)}>修改模块</ButtonLink>
          </div>
        )}
      />
    </SolutionTable>
  )

  return {
    refresh,
    listView
  }
}
