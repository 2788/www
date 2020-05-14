/**
 * @file 产品页文档链接 Pc 端
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'
import Link from 'next/link'

import { LinkItemProps, LinkGroupProps } from '..'

import styles from './style.less'

export function LinkItem({ href, children }: PropsWithChildren<LinkItemProps>) {
  const isOuterLink = href && href.indexOf('http') >= 0
  const content = isOuterLink
    ? <a href={href} target="_blank" rel="noopener">{children}</a>
    : <Link href={href}><a>{children}</a></Link>
  return (
    <li className={styles.item}>
      {content}
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
