/**
 * @file 翻页组件
 * @description TODO: 改为使用 icecream
 */

import React from 'react'
import RcPagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import style from './style.less'

export type Props = {
  /** 页码，从 1 开始 */
  current: number
  /** 页码变更回调函数 */
  onChange(page: number): void
  /** 总数 */
  total: number
  /** class 名 */
  className?: string
}

export default function Pagination(props: Props) {
  const className = [style.wrapper, props.className].filter(Boolean).join(' ')
  return <RcPagination {...props} className={className} />
}
