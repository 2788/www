/**
 * @file          component  Content
 * @description   纯显示 Content 组件
 * @author        renpanpan
 */

import React, { PropsWithChildren, ReactNode } from 'react'
import cls from 'classnames'
import { chunk } from 'lodash'

import style from './style.less'

export type Props = PropsWithChildren<{
  className?: string
  size?: number
  horizontal?: boolean
}>

export default function Content({ className, size = 3, children, horizontal }: Props) {
  const childrenArr: ReactNode[] = React.Children.toArray(children)
  const contentView = horizontal
    ? (
      chunk(childrenArr, size).map((group, index) => {
        while (group.length < 3) {
          group.push(null)
        }
        return (
          <div key={index} className={style.row}>
            {group.map((item, i) => <div className={style.item} key={i}>{item}</div>)}
          </div>
        )
      })
    )
    : (
      Array.from({ length: size }).map((_item, index) => (
        <li key={index} className={style.item}>
          {childrenArr.filter((_, i) => (i % size === index))}
        </li>
      ))
    )
  return (
    <ul className={cls(style.content, horizontal && style.horizontal, className)}>
      {contentView}
    </ul>
  )
}
