import React, { HTMLAttributes } from 'react'
import cls from 'classnames'
import * as style from './style.m.less'

/**
 * 容器组件，提供丰富的布局效果。
 * to honor the `width`, `height`,
 * to expand to fit the parent,
 * to be as big as possible.
 *
 * @param props
 */
export default function Container(props: HTMLAttributes<HTMLDivElement>) {
  const { className, children } = props

  return (
    <div className={cls(style.container, className)}>
      {children}
    </div>
  )
}
