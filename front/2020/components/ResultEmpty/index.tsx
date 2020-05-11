/**
 * @file 表示空结果的占位组件
 */

import React from 'react'

import IconEmpty from './empty.svg'
import style from './style.less'

export type Props = {
  tip?: string
  className?: string
}

export default function ResultEmpty({
  tip = '暂无结果',
  className
}: Props) {
  const wrapperClassName = [style.wrapper, className].filter(Boolean).join(' ')
  return (
    <div className={wrapperClassName}>
      <IconEmpty />
      <p>{tip}</p>
    </div>
  )
}
