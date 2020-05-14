import React, { FormEvent, useState } from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ResultEmpty from 'components/ResultEmpty'
import DeveloperSiteSearch from 'components/Header/DeveloperSiteSearch'
import { useApiWithParams } from 'hooks/api'
import { getHotKeywords, getSuggestions } from 'apis/search'
import { urlForSearch } from 'utils/route'

import SearchIcon from './search.svg'
import style from './style.less'

export default function Overlay() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  function handleKeywordSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (keyword) {
      router.push(urlForSearch(keyword))
    }
  }

  return (
    <div className={style.wrapper}>
      <form
        className={classnames(style.search)}
        onSubmit={handleKeywordSubmit}
        autoComplete="off"
      >
        <SearchIcon />
        <input
          className={style.input}
          placeholder="请输入要搜索的关键字"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
      </form>
      <Content keyword={keyword} />
    </div>
  )
}

function Content({ keyword }: { keyword: string }) {
  if (!keyword) {
    return <Hot />
  }
  return (
    <>
      <Suggestion keyword={keyword} />
      <div className={style.footer}>
        <DeveloperSiteSearch keyword={keyword} />
      </div>
    </>
  )
}

function Suggestion({ keyword }: { keyword: string }) {
  const { $: items, loading } = useApiWithParams(
    getSuggestions,
    { params: [keyword], delay: 500 }
  )

  // TODO: 样式
  if (loading) return <p>loading...</p>

  if (!items || items.length <= 0) {
    return <ResultEmpty className={style.empty} tip="未找到相关产品" />
  }

  const itemsView = (items || []).map(
    (item, i) => (
      <li key={i}>
        <Link href={urlForSearch(item)}>
          <a>{item}</a>
        </Link>
      </li>
    )
  )

  return (
    <ul className={style.list}>
      {itemsView}
    </ul>
  )
}

function Hot() {
  const { $: items } = useApiWithParams(getHotKeywords, { params: [] })

  const itemsView = (items || []).map(
    item => (
      <li key={item}>
        <Link href={urlForSearch(item)}>
          <a>{item}</a>
        </Link>
      </li>
    )
  )

  return (
    <div className={style.hot}>
      <div className={style.title}>热门搜索</div>
      <ul className={style.list}>
        {itemsView}
      </ul>
    </div>
  )
}