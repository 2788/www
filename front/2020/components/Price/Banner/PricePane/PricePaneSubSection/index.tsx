import React, { ReactNode } from 'react'

import style from './index.less'

export type PricePaneSubSectionProps = {
  title: string
  children: ReactNode
}

export function PricePaneSubSection(props: PricePaneSubSectionProps) {
  const { title, children } = props

  return (
    <div className={style.wrapper}>
      <div className={style.title}>{title}</div>
      <div className={style.content}>
        {children}
      </div>
    </div>
  )
}
