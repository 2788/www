import React, { ReactNode } from 'react'

import Link from 'components/Link'

import ArrowIcon from './arrow.svg'
import styles from './style.less'

export interface Props {
  href?: string | null // TODO: 类型修正
  iconUrl: string
  children: ReactNode
}

export default function LinkItem({ href, iconUrl, children }: Props) {
  return (
    <div className={styles.link}>
      {/* TODO: 去掉 target="_self" 和 ?? '' */}
      <Link href={href ?? ''} target="_self">
        <span className={styles.iconWrapper}>
          <img src={iconUrl} className={styles.icon} alt="icon" />
        </span>
        <span className={styles.text}>{children}<ArrowIcon /></span>
      </Link>
    </div>
  )
}
