import React, { PropsWithChildren } from 'react'
import Menu, { SubMenu, MenuItem } from 'rc-menu'
import Link from 'next/link'
import CollapsedIcon from './images/collapsed.svg'
import ExpandedIcon from './images/expanded.svg'
import { LinkItemProps, LinkGroupProps } from '..'

import 'rc-menu/assets/index.css'

import styles from './style.less'

export function LinkItem({ children, href }: PropsWithChildren<LinkItemProps>) {
  return (
    <MenuItem>
      <Link href={href}><a>{children}</a></Link>
    </MenuItem>
  )
}

export function LinkGroup(props: PropsWithChildren<LinkGroupProps>) {
  return React.createElement(SubMenu, { ...props, className: styles.linkGroup })
}

export function LinkGroups({ children }: PropsWithChildren<{}>) {
  function expandIcon(props: any) {
    if (props.isOpen) {
      return <ExpandedIcon className={styles.icon} />
    }
    return <CollapsedIcon className={styles.icon} />
  }
  return (
    <Menu mode="inline" expandIcon={expandIcon}>
      {children}
    </Menu>
  )
}
