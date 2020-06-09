/**
 * @file 产品页文档链接 Mobile 端
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren, Children } from 'react'
import Link from 'components/Link'
import Menu, { SubMenu } from 'components/UI/Menu'
import { LinkItemProps, LinkGroupProps } from '..'

import styles from './style.less'

export function LinkItem({ children, href }: PropsWithChildren<LinkItemProps>) {
  const anchorTitle = typeof children === 'string' ? children : undefined
  return (
    <Link title={anchorTitle} href={href}>
      <div className={styles.linkItem}>{children}</div>
    </Link>
  )
}

export function LinkGroup({ children }: PropsWithChildren<LinkGroupProps>) {
  return <>{children}</>
}

export function LinkGroups({ children }: PropsWithChildren<{}>) {
  return (
    <Menu mode="inline" inlineIndent={16}>
      {Children.map(children, group => {
        if (!React.isValidElement(group)) {
          return null
        }
        const { title } = group.props
        return (
          <SubMenu className={styles.linkGroup} title={title}>
            {group}
          </SubMenu>
        )
      })}
    </Menu>
  )
}
