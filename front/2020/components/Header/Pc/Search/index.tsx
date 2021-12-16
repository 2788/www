import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { urlForSearch } from 'utils/route'
import { useApiWithParams } from 'hooks/api'
import { getHotKeywords } from 'apis/search'

import SearchIcon from './search.svg'
import style from './style.less'
import Overlay from './Overlay'
import DropdownForHeader from '../Dropdown'

export default function Search({ className }: { className?: string }) {
  const router = useRouter()
  const [focus, setFocus] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [placeholder, setPlaceholder] = useState('')

  const { $: hotWords } = useApiWithParams(getHotKeywords, { params: [] })

  const hotWord = hotWords && hotWords[0] || '请输入要搜索的关键词'

  useEffect(() => {
    setPlaceholder(hotWord)
  }, [hotWord])

  function handleKeywordChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setKeyword(value)
    setOverlayVisible(!!value)
  }

  function handleKeywordBlur() {
    if (keyword === '') {
      setPlaceholder(hotWord)
    }
    setFocus(false)
    // 延迟一点收起，保证浮层可以被点击到
    setTimeout(() => setOverlayVisible(false), 300)
  }

  function handleKeywordSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (keyword) {
      setOverlayVisible(false)
      router.push(urlForSearch(keyword))
    }
  }

  function handleKeywordFocus() {
    setPlaceholder('请输入要搜索的关键词')
    setFocus(true)
    if (keyword) {
      setOverlayVisible(true)
    }
  }

  const overlayView = (
    <Overlay keyword={keyword} />
  )

  return (
    <DropdownForHeader
      align={{ offset: [0, 4] }}
      visible={overlayVisible}
      overlay={overlayView}
    >
      <form
        className={classnames(style.wrapper, focus && style.wrapperFocus, className)}
        onSubmit={handleKeywordSubmit}
        autoComplete="off"
      >
        <input
          name="keyword"
          className={style.input}
          placeholder={placeholder}
          onChange={handleKeywordChange}
          onFocus={handleKeywordFocus}
          onBlur={handleKeywordBlur}
        />
        <button className={style.submitBtn} type="submit">
          <SearchIcon className={style.icon} />
        </button>
      </form>
    </DropdownForHeader>
  )
}
