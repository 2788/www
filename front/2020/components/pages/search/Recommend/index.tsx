/**
 * @file 搜索页的产品部分
 */

import React from 'react'
import Link from 'next/link'
import style from './style.less'

export type Props = {
  className?: string
}

export default function SearchRecommend({ className }: Props) {
  const wrapperClassName = [style.wrapper, className].filter(Boolean).join(' ')
  return (
    <div className={wrapperClassName}>
      <h4 className={style.title}>产品推荐</h4>
      <ul className={style.list}>
        <li className={style.item}>
          <Link href="/products/kodo"><a>对象存储</a></Link>
        </li>
        <li className={style.item}>
          <Link href="/TODO"><a>归档存储</a></Link>
        </li>
        <li className={style.item}>
          <Link href="/TODO"><a>大数据存储解决方案</a></Link>
        </li>
        <li className={style.item}>
          <Link href="/TODO"><a>视频冷存储解决方案</a></Link>
        </li>
      </ul>
    </div>
  )
}
