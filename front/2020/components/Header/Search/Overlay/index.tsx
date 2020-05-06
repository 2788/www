import React from 'react'
import Link from 'next/link'

import EmptyIcon from './empty.svg'
import ArrowRightIcon from './arrow-right.svg'
import style from './style.less'

export type Props = {
  search?: string
  // TODO 改类型
  result?: any[]
}

export default function Overlay({ search, result = [] }: Props) {
  const content = result.length === 0 ? <Empty /> : <ResultList />

  return (
    <ul className={style.overlay}>
      <li className={style.contentArea}>
        {content}
      </li>
      <li className={style.footer}>
        <Link href="">
          <a>在文档中心搜索<span className={style.key}>{search}</span> <ArrowRightIcon className={style.arrow} /></a>
        </Link>
      </li>
    </ul>
  )
}

function Empty() {
  return (
    <div className={style.empty}>
      <EmptyIcon />
      <p>未找到相关产品</p>
    </div>
  )
}

function ResultList() {
  return (
    <ul className={style.resultList}>
      <li><Link href=""><a>对象存储</a></Link></li>
      <li><Link href=""><a>归档存储</a></Link></li>
      <li><Link href=""><a>大数据 (存储) 解决方案</a></Link></li>
      <li><Link href=""><a>视频冷存储解决方案</a></Link></li>
      <li><Link href=""><a>监控视频边缘存储方案</a></Link></li>
      <li><Link href=""><a>超出滚动</a></Link></li>
      <li><Link href=""><a>超出滚动</a></Link></li>
    </ul>
  )
}
