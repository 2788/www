import React, { useState } from 'react'
import classnames from 'classnames'
import Dropdown from '../../UI/Dropdown'

import SearchIcon from './search.svg'
import style from './style.less'
import Overlay from './Overlay'

export default function Search() {
  const [focus, setFocus] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

  function handleSearch() {
    // TODO 实现搜索逻辑 debounce
    console.log(searchResult, setSearchResult)
  }

  return (
    <Dropdown align={{ offset: [-40, 15] }} visible={!!search} overlay={() => <Overlay search={search} result={[1]} />}>
      <span className={classnames(style.wrapper, focus && style.wrapperFocus)}>
        <input
          className={style.input}
          // TODO placeholder 应该是动态的？
          placeholder="云存储"
          onChange={event => setSearch(event.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <SearchIcon className={style.icon} onClick={handleSearch} />
      </span>
    </Dropdown>
  )
}
