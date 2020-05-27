/**
 * @file 搜索页的产品部分
 */

import React from 'react'
import Link from 'components/Link'
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
          <Link href="/products/pandora">Pandora 数据分析平台</Link>
        </li>
        <li className={style.item}>
          <Link href="/TODO">归档存储</Link>
        </li>
        <li className={style.item}>
          <Link href="/TODO">大数据存储解决方案</Link>
        </li>
        <li className={style.item}>
          <Link href="/TODO">视频冷存储解决方案</Link>
        </li>
      </ul>
    </div>
  )
}
