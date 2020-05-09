import React from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import SearchIcon from './search.svg'

import style from './style.less'

export default function Overlay() {
  function handleSearch() {
    // TODO debounce
  }
  return (
    <div className={style.wrapper}>
      <span className={classnames(style.search)}>
        <SearchIcon />
        <input
          className={style.input}
          placeholder="请输入要搜索的关键字"
          onChange={handleSearch}
        />
      </span>
      <div className={style.title}>热门搜索</div>
      <ul className={style.list}>
        <li><Link href="TODO"><a>CDN</a></Link></li>
        <li><Link href="TODO"><a>云服务器</a></Link></li>
        <li><Link href="TODO"><a>直播</a></Link></li>
        <li><Link href="TODO"><a>对象存储</a></Link></li>
      </ul>
    </div>
  )
}
