import React from 'react'
import Link from 'next/link'
import classnames from 'classnames'
import Hot from '../../../../Hot'

import style from './style.less'

export type ContentItemProps = {
  disabled?: boolean
  href: string
  // 可能是"热门"之外的内容
  hot?: boolean | string
  icon: React.ReactNode
  title: string
  subtitle: string
}

export default function ContentItem(props: ContentItemProps) {
  const { disabled, href, hot, icon, title, subtitle } = props
  const hotIcon = hot && (typeof hot === 'boolean' ? <Hot /> : <Hot text={hot} />)

  return (
    <li className={classnames(style.wrapper, disabled && style.disabled)}>
      <Link href={href}>
        <a>
          <div className={style.icon}>{icon}</div>
          <div className={style.desc}>
            <div className={style.title}>{title} {hotIcon}</div>
            <div className={style.subtitle}>{subtitle}</div>
          </div>
        </a>
      </Link>
    </li>
  )
}
