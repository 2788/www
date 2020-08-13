import React, { ReactNode } from 'react'

import style from './index.less'

export type PricePaneSubSectionProps = {
  title: string
  padding?: boolean
  children: ReactNode
}

export function PricePaneSubSection(props: PricePaneSubSectionProps) {
  const { title, children, padding = false } = props

  return (
    <div className={style.wrapper}>
      <div className={style.title}>{title}</div>
      <div className={style.content} style={{ padding: padding ? '24px' : 0 }}>
        {children}
      </div>
    </div>
  )
}
