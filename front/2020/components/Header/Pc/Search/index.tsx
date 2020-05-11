import React, { useState, ChangeEvent, FormEvent } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import Dropdown from 'components/UI/Dropdown'
import { urlForSearch } from 'utils/route'

import SearchIcon from './search.svg'
import style from './style.less'
import Overlay from './Overlay'

export default function Search() {
  const router = useRouter()
  const [focus, setFocus] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [overlayVisible, setOverlayVisible] = useState(false)

  function handleKeywordChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setKeyword(value)
    setOverlayVisible(!!value)
  }

  function handleKeywordBlur() {
    setFocus(false)
    // 延迟一点收起，保证浮层可以被点击到
    setTimeout(() => setOverlayVisible(false), 100)
  }

  function handleKeywordSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (keyword) {
      setOverlayVisible(false)
      router.push(urlForSearch(keyword))
    }
  }

  const overlayView = (
    <Overlay keyword={keyword} />
  )

  return (
    <Dropdown
      align={{ offset: [0, 4] }}
      visible={overlayVisible}
      overlay={overlayView}
    >
      <form
        className={classnames(style.wrapper, focus && style.wrapperFocus)}
        onSubmit={handleKeywordSubmit}
        autoComplete="off"
      >
        <input
          name="keyword"
          className={style.input}
          // TODO placeholder 应该是动态的？
          placeholder="云存储"
          onChange={handleKeywordChange}
          onFocus={() => setFocus(true)}
          onBlur={handleKeywordBlur}
        />
        <button className={style.submitBtn} type="submit">
          <SearchIcon className={style.icon} />
        </button>
      </form>
    </Dropdown>
  )
}
