import React, { ReactNode, MouseEvent } from 'react'
import Link from 'components/Link'
import classnames from 'classnames'
import Hot from 'components/Hot'

import style from './style.less'

export type ContentItemProps = {
  disabled?: boolean
  href: string
  // 可能是"热门"之外的内容
  hot?: boolean | string
  icon: ReactNode
  title: string
  subtitle: string
  onClick?(e: MouseEvent): void
  extra?: ReactNode
}

export default function ContentItem(props: ContentItemProps) {
  const { disabled, href, hot, icon, title, subtitle, onClick, extra } = props
  const hotIcon = hot && (typeof hot === 'boolean' ? <Hot /> : <Hot text={hot} />)

  return (
    <li className={classnames(style.li, disabled && style.disabled)}>
      <Link href={href} onClick={onClick}>
        <div className={style.icon}>{icon}</div>
        <div className={style.desc}>
          <div className={style.title}>{title} {hotIcon}</div>
          <div className={style.subtitle}>{subtitle}</div>
          {extra}
        </div>
      </Link>
    </li>
  )
}
