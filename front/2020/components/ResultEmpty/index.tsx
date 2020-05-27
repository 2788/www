/**
 * @file 表示空结果的占位组件
 */

import React, { CSSProperties } from 'react'

import IconEmpty from './empty.svg'
import style from './style.less'

export type Props = {
  tip?: string
  className?: string
  style?: CSSProperties
}

export default function ResultEmpty({
  tip = '暂无结果',
  className,
  style: _style
}: Props) {
  const wrapperClassName = [style.wrapper, className].filter(Boolean).join(' ')
  return (
    <div className={wrapperClassName} style={_style}>
      <IconEmpty />
      <p>{tip}</p>
    </div>
  )
}
