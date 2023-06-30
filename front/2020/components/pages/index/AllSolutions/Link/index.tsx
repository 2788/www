import React, { ReactNode } from 'react'

import Link from 'components/Link'

import ArrowIcon from './arrow.svg'
import styles from './style.less'

export interface Props {
  href: string | null
  iconUrl: string
  children: ReactNode
}

export default function LinkItem({ href, iconUrl, children }: Props) {
  if (!href) {
    // eslint-disable-next-line no-console
    console.error('Missing url.')
    return null
  }

  return (
    <div className={styles.link}>
      <Link href={href} target="_self">
        <span className={styles.iconWrapper}>
          <img src={iconUrl} className={styles.icon} alt="icon" />
        </span>
        <span className={styles.text}>{children}<ArrowIcon /></span>
      </Link>
    </div>
  )
}
