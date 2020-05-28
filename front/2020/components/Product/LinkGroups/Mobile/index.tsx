/**
 * @file 产品页文档链接 Mobile 端
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'
import Link from 'components/Link'
import Menu, { SubMenu } from 'components/UI/Menu'
import { LinkItemProps, LinkGroupProps } from '..'

import styles from './style.less'

export function LinkItem({ children, href }: PropsWithChildren<LinkItemProps>) {
  // TODO: 默认用 children 作为 title？
  const anchorTitle = typeof children === 'string' ? children : undefined
  return (
    <Link title={anchorTitle} href={href}>
      <div className={styles.linkItem}>{children}</div>
    </Link>
  )
}

export function LinkGroup(props: PropsWithChildren<LinkGroupProps>) {
  // TODO: 这个会导致 PC 切移动的转换过程报错（可以手机旋转来复现）
  return React.createElement(SubMenu, { ...props, className: styles.linkGroup })
}

export function LinkGroups({ children }: PropsWithChildren<{}>) {
  return (
    <Menu mode="inline" inlineIndent={16}>
      {children}
    </Menu>
  )
}
