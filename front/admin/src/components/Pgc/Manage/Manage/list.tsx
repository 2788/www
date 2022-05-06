/**
 * @file 内容管理
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  Table, TableType, TablePaginationOptions, TableColumnSelectFilterOptions, Button
} from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'
import { ButtonLink } from 'admin-base/common/components/Link'

import { timeFormatter } from 'utils/time'
import { pgcManageEditTitle } from 'constants/route'
import {
  ContentId, Content,
  ContentType, contentTypes, contentTypeTextMap, ContentCategory, contentCategories, contentCategoryTextMap
} from 'constants/pgc/conetnt'
import {
  getEditPageUrl, getWwwContentDetailUrl, getWwwContentDetailEmbedMarkdown, isUpToDate
} from 'transforms/pgc/content'
import PgcContentApis from 'apis/pgc/content'

import style from './list.m.less'

const PgcTable: TableType<Content> = Table

function usePgcListState() {
  const toasterStore = useInjection(ToasterStore)
  const pgcContentApis = useInjection(PgcContentApis)

  const [isLoading, setIsLoading] = useState(true)
  const [records, setRecords] = useState<Content[]>([])

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

  const [selectedContentType, selecteContentType] = useState<ContentType | null>(null)
  const contentTypeColumnFilter = useMemo<TableColumnSelectFilterOptions<ContentType>>(() => ({
    type: 'select',
    value: selectedContentType,
    optionItems: contentTypes.map(
      contentType => ({
        text: contentTypeTextMap[contentType],
        value: contentType
      })
    ),
    onChange(contentType) {
      selecteContentType(contentType)
    }
  }), [selectedContentType])

  const [selectedContentCategory, selecteContentCategory] = useState<ContentCategory | null>(null)
  const contentCategoryColumnFilter = useMemo<TableColumnSelectFilterOptions<ContentCategory>>(() => ({
    type: 'select',
    value: selectedContentCategory,
    optionItems: contentCategories.map(
      contentCategory => ({
        text: contentCategoryTextMap[contentCategory],
        value: contentCategory
      })
    ),
    onChange(contentCategory) {
      selecteContentCategory(contentCategory)
    }
  }), [selectedContentCategory])

  const refresh = useCallback(() => {
    setIsLoading(true)
    toasterStore.promise(
      pgcContentApis.list(
        {
          ...(selectedContentType && { type: selectedContentType }),
          ...(selectedContentCategory && { 'draft.category': selectedContentCategory })
        }, {
          offset: currentPage * pageSize,
          limit: pageSize
        }
      )
        .then(result => {
          setRecords(result.data)
          setTotalPage(result.count)
        })
        .finally(() => { setIsLoading(false) })
    )
  }, [pgcContentApis, toasterStore, currentPage, pageSize, selectedContentType, selectedContentCategory])

  useEffect(() => {
    refresh()
  }, [refresh])

  return {
    records,
    isLoading,
    pagination,
    contentTypeColumnFilter,
    contentCategoryColumnFilter,
    refresh
  }
}

export function usePgcList() {
  const toasterStore = useInjection(ToasterStore)
  const pgcContentApis = useInjection(PgcContentApis)

  const {
    records, isLoading, pagination, contentTypeColumnFilter, contentCategoryColumnFilter, refresh
  } = usePgcListState()

  function deleteContent(id: ContentId) {
    toasterStore.promise(
      pgcContentApis.delete(id).then(() => { refresh() })
    )
  }

  function renderOperations(id: ContentId, isReleased: boolean) {
    return (
      <div className={style.operations}>
        <ButtonLink type="link" to={getEditPageUrl(id)}>{pgcManageEditTitle}</ButtonLink>
        {/* TODO: 二次确认？ */}
        <Button type="link" onClick={() => { deleteContent(id) }}>删除</Button>
        {isReleased && (<>
          <CopyToClipboard
            text={getWwwContentDetailUrl(id)}
            // TODO: 提示文本应该出现在字旁边
            onCopy={() => { toasterStore.info('复制完成') }}
          >
            <Button type="link">复制链接</Button>
          </CopyToClipboard>
          <CopyToClipboard
            text={getWwwContentDetailEmbedMarkdown(id) + '\n'} // FIXME: 貌似有 bug 会吞掉结尾的最后一个回车
            // TODO: 提示文本应该出现在字旁边
            onCopy={() => { toasterStore.info('复制完成') }}
          >
            <Button type="link">复制嵌入内容</Button>
          </CopyToClipboard>
        </>)}
      </div>
    )
  }

  const listView = (
    <PgcTable
      records={records}
      recordIdAccessor="id"
      pagination={pagination}
      loading={isLoading}
    >
      <PgcTable.Column
        title="内容 ID"
        accessor="id"
      />
      <PgcTable.Column
        title="种类"
        accessor="type"
        filter={contentTypeColumnFilter}
        render={contentType => contentTypeTextMap[contentType]}
      />
      <PgcTable.Column
        title="标题"
        id="draft.title"
        render={(_, { draft: { title } }) => title}
      />
      <PgcTable.Column
        title="类别"
        id="draft.category"
        filter={contentCategoryColumnFilter}
        render={(_, { draft: { category } }) => contentCategoryTextMap[category]}
      />
      <PgcTable.Column
        title="状态"
        id="status"
        render={(_, record) => (isUpToDate(record) ? '已发布' : '草稿')}
      />
      <PgcTable.Column
        title="更新时间"
        id="draft.updatedAt"
        render={(_, { draft: { updatedAt } }) => timeFormatter()(updatedAt)}
      />
      <PgcTable.Column
        title="操作"
        id="operations"
        render={(_, { id, release }) => renderOperations(id, !!release)}
      />
    </PgcTable>
  )

  return {
    isLoading,
    refresh,
    listView
  }
}
