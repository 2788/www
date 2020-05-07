import React, { PropsWithChildren } from 'react'
import Link from 'next/link'

import styles from './style.less'

export interface LinkItemProps {
  href: string
}

export function LinkItem({ href, children }: PropsWithChildren<LinkItemProps>) {
  return (
    <li className={styles.item}>
      <Link href={href}>
        <a target="_blank" rel="noopener">{children}</a>
      </Link>
    </li>
  )
}

export interface LinkGroupProps {
  title: string
}

export function LinkGroup({ title, children }: PropsWithChildren<LinkGroupProps>) {
  return (
    <li className={styles.group}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.links}>{children}</ul>
    </li>
  )
}

export default function LinkGroups({ children }: PropsWithChildren<{}>) {
  if (React.Children.count(children) > 4) {
    throw new Error('Link Groups\'s children no more then 4')
  }
  return (
    <ul className={styles.linkGroups}>
      {children}
    </ul>
  )
}
