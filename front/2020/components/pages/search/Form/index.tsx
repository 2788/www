/**
 * @file 搜索页的表单部分
 */

import React, { ReactNode, useEffect, useState, FormEvent, useRef, ChangeEvent } from 'react'
import Link from 'components/Link'
import { urlForSearch } from 'utils/route'
import { useApi } from 'hooks/api'
import { getHotKeywords } from 'apis/search'
import Dropdown from 'components/UI/Dropdown'
import Suggestion from './Suggestion'
import IconSearch from './search.svg'
import style from './style.less'

export type Props = {
  keyword: string
  onSubmit(keyword: string): void
}

export default function SearchForm({ keyword, onSubmit }: Props) {

  const inputWrapperRef = useRef(null)
  const [keywordInput, setKeywordInput] = useState(keyword)

  // `props.keyword` 变更 -> 同步到 `keywordInput`
  useEffect(() => setKeywordInput(keyword), [keyword])

  const [suggestionVisible, setSuggestionVisible] = useState(false)

  function handleSuggestionSelect(selected: string) {
    setKeywordInput(selected)
    setSuggestionVisible(false)
    onSubmit(selected)
  }

  const suggestionView = (
    <Suggestion keyword={keywordInput} onSelect={handleSuggestionSelect} />
  )

  function handleKeywordChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setKeywordInput(value)
    setSuggestionVisible(!!value)
  }

  function handleKeywordBlur() {
    // 延迟一点收起，保证浮层可以被点击到
    setTimeout(() => setSuggestionVisible(false), 100)
  }

  function handleKeywordFocus() {
    setSuggestionVisible(!!keywordInput)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSuggestionVisible(false)
    onSubmit(keywordInput)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        <Dropdown
          visible={suggestionVisible}
          overlay={suggestionView}
          align={{ offset: [0, 4] }}
          overlayClassName={style.suggestionOverlay}
          getPopupContainer={() => inputWrapperRef.current || window.document.body}
        >
          <form
            ref={inputWrapperRef}
            className={style.inputWrapper}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <IconSearch className={style.icon} />
            <input
              type="text"
              name="keyword"
              className={style.input}
              placeholder="请输入要搜索的关键词"
              value={keywordInput}
              onChange={handleKeywordChange}
              onFocus={handleKeywordFocus}
              onBlur={handleKeywordBlur}
            />
            <button type="submit" className={style.submitBtn}>搜索</button>
          </form>
        </Dropdown>
        <Hot />
      </div>
    </div>
  )
}

// 热门搜索
function Hot() {
  const { $: hotKeywords, call: callHotKeywords } = useApi(getHotKeywords)

  useEffect(() => {
    callHotKeywords()
  }, [callHotKeywords])

  const hotKeywodsView = withSep((hotKeywords || []).map(
    hotKeyword => (
      <Link key={'keyword-' + hotKeyword} href={urlForSearch(hotKeyword)}>
        {hotKeyword}
      </Link>
    )
  ))

  return (
    <div className={style.hot}>
      <span className={style.label}>热门搜索：</span>
      {hotKeywodsView}
    </div>
  )
}

function Sep() {
  return <div className={style.sep}></div>
}

function withSep(nodes: ReactNode[]) {
  return nodes.reduce<ReactNode[]>((result, node, i) => (
    i > 0
    ? [...result, <Sep key={'sep-' + i} />, node]
    : [...result, node]
  ), [])
}
