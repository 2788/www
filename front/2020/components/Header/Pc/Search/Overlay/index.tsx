import React from 'react'
import Link from 'next/link'
import { useApiWithParams } from 'hooks/api'
import ResultEmpty from 'components/ResultEmpty'
import DeveloperSiteSearch from 'components/Header/DeveloperSiteSearch'
import { getSuggestions } from 'apis/search'
import { urlForSearch } from 'utils/route'

import style from './style.less'

export type Props = {
  keyword: string
}

export default function Overlay({ keyword }: Props) {
  return (
    <ul className={style.overlay}>
      <li className={style.contentArea}>
        <Suggestion keyword={keyword} />
      </li>
      <li className={style.footer}>
        <DeveloperSiteSearch keyword={keyword} />
      </li>
    </ul>
  )
}

function Suggestion({ keyword }: Props) {
  const { $: items, loading } = useApiWithParams(
    getSuggestions,
    { params: [keyword], delay: 500 }
  )

  // TODO: 样式
  if (loading) return <p className={style.loading}>loading...</p>

  if (!items || items.length <= 0) {
    return <ResultEmpty className={style.empty} tip="未找到相关产品" />
  }

  const itemsView = items.map(
    (item, i) => (
      <li key={i}>
        <Link href={urlForSearch(item)}>
          <a className={style.resultLink}>{item}</a>
        </Link>
      </li>
    )
  )

  return (
    <ul className={style.resultList}>
      {itemsView}
    </ul>
  )
}
