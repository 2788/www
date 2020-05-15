import React, { ReactNode } from 'react'
import classnames from 'classnames'

import style from './index.less'

export type PricePaneSectionProps = {
  title: string
  tip?: ReactNode
  className?: string
  children: ReactNode
}

export function PricePaneSection(props: PricePaneSectionProps) {
  const { title, tip, className, children } = props

  return (
    <section className={classnames(style.wrapper, className)}>
      <h2>{title}</h2>
      {tip && <div className={style.tip}>{tip}</div>}
      <div className={style.content}>{children}</div>
    </section>
  )
}
