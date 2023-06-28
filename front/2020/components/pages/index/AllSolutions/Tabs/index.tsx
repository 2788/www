import React, { ReactNode } from 'react'
import classNames from 'classnames'

import { useChildrenProps } from 'hooks/rn'

import styles from './style.less'

export interface TabPaneProps {
  iconUrl: string
  title: string
  children: ReactNode
}

export function TabPane(_props: TabPaneProps) {
  return null
}

export interface Props {
  value: number
  onChange(value: number): void
  children: ReactNode
}

export default function Tabs({ value, onChange, children }: Props) {
  const tabPanes = useChildrenProps<TabPaneProps>(children)
  return (
    <div className={styles.tabs}>
      <div className={styles.navs}>
        {tabPanes.map((tabPaneProps, index) => (
          <div
            key={index}
            onMouseEnter={() => { onChange(index) }}
            onClick={() => { onChange(index) }}
            className={classNames(
              styles.nav,
              index === value ? styles.active : styles.inactive
            )}
          >
            <div className={styles.iconWrapper}>
              <img className={styles.icon} src={tabPaneProps.iconUrl} alt="icon" />
            </div>
            <div className={styles.title}>{tabPaneProps.title}</div>
          </div>
        ))}
      </div>
      <div className={styles.panes}>
        {tabPanes.map((tabPaneProps, index) => (
          <div
            key={index}
            className={classNames(
              styles.pane,
              index === value ? styles.active : styles.inactive
            )}
          >
            {tabPaneProps.children}
          </div>
        ))}
      </div>
    </div>
  )
}
