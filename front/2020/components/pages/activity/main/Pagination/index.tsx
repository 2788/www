import React from 'react'
import { useRouter } from 'next/router'
import Pagination from 'react-icecream/lib/pagination'

import { useMobile } from 'hooks/ua'
import { Activity, urlMap, pageSize } from 'constants/activity'

import style from './style.less'

export default function ActivityPagination(props: { current: number, total: number }) {
  const { push } = useRouter()
  return (
    <Pagination
      className={style.pagination}
      size={useMobile() ? 'small' : 'default'}
      pageSize={pageSize}
      {...props}
      onChange={page => push(`${urlMap[Activity.Page]}/${page}`)}
    />
  )
}
