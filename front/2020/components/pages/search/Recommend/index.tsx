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
          <Link href="/solutions/qavs#arch">智能视频云解决方案</Link>
        </li>
        <li className={style.item}>
          <Link href="/products/faceid">人脸核验</Link>
        </li>
        <li className={style.item}>
          <Link href="/products/plsv">短视频 SDK</Link>
        </li>
      </ul>
    </div>
  )
}
