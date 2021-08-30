/**
 * @file 折叠面板
 */

import React, { ReactNode, useState } from 'react'
import classnames from 'classnames'

// TODO: 应该直接从 `react-icecream-2/icons` 引，但现在 run 不起来，不是 lint 问题
import { DownThinIcon, RightThinIcon } from 'react-icecream-2/lib/icons'

import style from './style.less'

export interface PanelProps {
  header: ReactNode
  children: ReactNode
  className?: string
}

export function CollapsePanel({ header, children, className }: PanelProps) {
  const [isActive, setIsActive] = useState(false)
  return (
    <div className={classnames(style.panel, className)}>
      <div className={style.header} onClick={() => { setIsActive(!isActive) }}>
        {
          isActive
          ? (<DownThinIcon className={style.headerIcon} />)
          : (<RightThinIcon className={style.headerIcon} />)
        }
        <div className={style.headerTitle}>{header}</div>
      </div>
      <div className={classnames(style.content, !isActive && style.contentHidden)}>
        {children}
      </div>
    </div>
  )
}

export interface Props {
  children: ReactNode
  className?: string
}

export default function Collapse({ children, className }: Props) {
  return (
    <div className={classnames(style.collapse, className)}>
      {children}
    </div>
  )
}
