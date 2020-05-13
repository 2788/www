import React, { PropsWithChildren } from 'react'
import Link from 'next/link'

import { LinkItemProps, LinkGroupProps } from '..'

import styles from './style.less'

export function LinkItem({ href, children }: PropsWithChildren<LinkItemProps>) {
  return (
    <li className={styles.item}>
      <Link href={href}>
        <a target="_blank" rel="noopener">{children}</a>
      </Link>
    </li>
  )
}

export function LinkGroup({ title, children }: PropsWithChildren<LinkGroupProps>) {
  return (
    <li className={styles.group}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.links}>{children}</ul>
    </li>
  )
}

export function LinkGroups({ children }: PropsWithChildren<{}>) {
  return (
    <ul className={styles.linkGroups}>
      {children}
    </ul>
  )
}
