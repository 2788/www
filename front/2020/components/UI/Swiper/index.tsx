/**
 * @file 滚动轮播组件
 * @description 以及配套的翻页、箭头组件
 */

import React, { PropsWithChildren } from 'react'
import SwipeableViews from 'react-swipeable-views'

import IconArrowPrev from './arrow-prev.svg'
import IconArrowNext from './arrow-next.svg'
import style from './style.less'

export type IndexInfo = {
  index: number
  onIndexChange(index: number): void
}

export type Props = PropsWithChildren<Partial<IndexInfo>>

export default function Swiper({ index, onIndexChange, children }: Props) {
  return (
    <SwipeableViews
      index={index}
      onIndexChange={onIndexChange}
    >
      {children}
    </SwipeableViews>
  )
}

export type PaginationProps = IndexInfo & {
  num: number
  className?: string
}

export function Pagination({ index, onIndexChange, num, className }: PaginationProps) {

  const itemsView = Array.from({ length: num }).map((_, i) => {
    const itemClassName = join(style.paginationItem, i === index && style.active)
    return (
      <li
        key={i}
        className={itemClassName}
        onClick={() => onIndexChange(i)}
      ></li>
    )
  })

  const wrapperClassName = join(style.pagination, className)

  return (
    <ol className={wrapperClassName}>
      {itemsView}
    </ol>
  )
}

export type ArrowProps = IndexInfo & {
  num: number
  className?: string
}

export function ArrowPrev({ index, onIndexChange, num, className }: ArrowProps) {
  const wrapperClassName = join(style.arrowPrev, className)
  function handleClick() {
    onIndexChange((index - 1 + num) % num)
  }
  return (
    <div className={wrapperClassName} onClick={handleClick}>
      <IconArrowPrev className={style.icon} />
    </div>
  )
}

export function ArrowNext({ index, onIndexChange, num, className }: ArrowProps) {
  const wrapperClassName = join(style.arrowNext, className)
  function handleClick() {
    onIndexChange((index + 1) % num)
  }
  return (
    <div className={wrapperClassName} onClick={handleClick}>
      <IconArrowNext className={style.icon} />
    </div>
  )
}

function join(...classNames: any[]) {
  return classNames.filter(Boolean).join(' ')
}
