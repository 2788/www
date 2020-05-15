/**
 * @file 产品页文档链接 Mobile 端
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import Menu, { SubMenu } from 'components/UI/Menu'
import { LinkItemProps, LinkGroupProps } from '..'

import styles from './style.less'

export function LinkItem({ children, href }: PropsWithChildren<LinkItemProps>) {
  const isOuterLink = href && href.indexOf('http') >= 0
  const content = <div className={styles.linkItem}>{children}</div>
  return (
    isOuterLink
      ? <a href={href}>{content}</a>
      : <Link href={href}><a>{content}</a></Link>
  )
}

export function LinkGroup(props: PropsWithChildren<LinkGroupProps>) {
  return React.createElement(SubMenu, { ...props, className: styles.linkGroup })
}

export function LinkGroups({ children }: PropsWithChildren<{}>) {
  return (
    <Menu mode="inline" inlineIndent={16}>
      {children}
    </Menu>
  )
}
