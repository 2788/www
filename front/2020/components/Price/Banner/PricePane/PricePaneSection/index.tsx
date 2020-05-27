import React, { ReactNode } from 'react'
import classnames from 'classnames'

import style from './index.less'

export type PricePaneSectionProps = {
  title: string
  tip?: ReactNode
  className?: string
  padding?: boolean
  children: ReactNode
}

export function PricePaneSection(props: PricePaneSectionProps) {
  const { title, tip, className, children, padding = false } = props

  return (
    <section className={classnames(style.wrapper, className)}>
      <h2>{title}</h2>
      {tip && <div className={style.tip}>{tip}</div>}
      <div className={classnames(style.content, padding && style.padding)}>{children}</div>
    </section>
  )
}
