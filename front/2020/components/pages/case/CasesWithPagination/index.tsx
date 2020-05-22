/**
 * @file 带翻页的客户案例（LOGO 墙）
 */

import React, { useState } from 'react'
import Pagination from 'components/UI/Pagination'
import { RawCustomerCaseGroup as CustomerCaseGroup, CustomerCase } from 'components/Product/CustomerCaseGroup'
import { useOnChange } from 'hooks'
import style from './style.less'

export type CaseInfo = {
  logo: string
  name: string
}

export type Props = {
  cases: CaseInfo[]
  className?: string
}

const pageSize = 8 // 每页 8 个

export default function CasesWithPagination({ cases, className }: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  // 客户案例列表发生变化时，重置页码
  useOnChange(() => setCurrentPage(1), [cases])

  const total = cases.length

  const wrapperClass = [style.wrapper, className].filter(Boolean).join(' ')

  const paginationView = total > pageSize && (
    <Pagination
      className={style.pagination}
      current={currentPage}
      onChange={setCurrentPage}
      pageSize={pageSize}
      total={total}
    />
  )

  const start = (currentPage - 1) * pageSize
  const end = currentPage * pageSize
  const casesView = cases.slice(start, end).map(({ name, logo }, i) => (
    <CustomerCase key={i} pic={logo} alt={name} />
  ))

  return (
    <div className={wrapperClass}>
      <CustomerCaseGroup>
        {casesView}
      </CustomerCaseGroup>
      {paginationView}
    </div>
  )
}
