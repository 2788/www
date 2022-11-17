/**
 * @file 产品列表
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Table, TableType, TablePaginationOptions, Button, Tooltip } from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'
import { ButtonLink } from 'admin-base/common/components/Link'
import { ShareIcon } from 'react-icecream/icons'

import { timeFormatter } from 'utils/time'
import { ProductId, wwwProductPathPrefix } from 'constants/product'
import { getProductPageInfoPageUrl } from 'transforms/product/info'
import ProductInfoApis, { ProductInfo } from 'apis/product/info'
import { wwwHost } from 'constants/env'

import styles from './style.m.less'

const ProductTable: TableType<ProductInfo> = Table

function useProductListState() {
  const toasterStore = useInjection(ToasterStore)
  const productInfoApis = useInjection(ProductInfoApis)

  const [isLoading, setIsLoading] = useState(true)
  const [records, setRecords] = useState<ProductInfo[]>([])

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
      productInfoApis.list({ currentPage, pageSize })
        .then(result => {
          setRecords(result.data)
          setTotalPage(result.count)
        })
        .finally(() => { setIsLoading(false) })
    )
  }, [productInfoApis, toasterStore, currentPage, pageSize])

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

export default function useProductList(editMetaInfo: (productId: ProductId) => void) {
  const { records, isLoading, pagination, refresh } = useProductListState()

  const listView = (
    <ProductTable
      records={records}
      recordIdAccessor="path"
      pagination={pagination}
      loading={isLoading}
    >
      <ProductTable.Column
        title="地址"
        accessor="path"
        render={path => (
          <>
            <span>{wwwProductPathPrefix}{path} </span>
            <Tooltip title="新 Tab 页访问">
              <ButtonLink
                type="link"
                size="small"
                to={wwwHost + wwwProductPathPrefix + path}
                target="_blank"
              >
                <ShareIcon />
              </ButtonLink>
            </Tooltip>
          </>
        )}
      />
      <ProductTable.Column
        title="名称"
        accessor="name"
      />
      <ProductTable.Column
        title="更新时间"
        accessor="updatedAt"
        render={updatedAt => timeFormatter()(updatedAt)}
      />
      <ProductTable.Column
        title="操作"
        render={(_, { path }) => (
          <div className={styles.operations}>
            <Button type="link" onClick={() => { editMetaInfo(path) }}>修改信息</Button>
            <ButtonLink type="link" to={getProductPageInfoPageUrl(path)}>修改模块</ButtonLink>
          </div>
        )}
      />
    </ProductTable>
  )

  return {
    refresh,
    listView
  }
}
