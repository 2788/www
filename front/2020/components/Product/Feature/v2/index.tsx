import React, { ReactNode, PropsWithChildren } from 'react'
import classnames from 'classnames'

import { useMobile } from 'hooks/ua'

import styles from './style.less'

// 图片和文案和布局，支持上下布局和左右布局，默认上下布局
export type PosType = 'top-down' | 'left-right' | undefined

export interface ItemProps {
  title?: ReactNode
  desc: ReactNode
  icon: ReactNode
  pos?: PosType
}

export function Raw({ children }: PropsWithChildren<{}>) {
  const isMobile = useMobile()

  if (!children) {
    return null
  }

  return isMobile
    ? (
      <div className={styles.mobileWrapper}>
        {children}
      </div>
    )
    : (
      <div className={styles.pcWrapper}>
        {children}
      </div>
    )
}

export function Group({ children }: PropsWithChildren<{}>) {
  if (!children) {
    return null
  }

  return (
    <div className={styles.groupWrapper}>
      {children}
    </div>
  )
}

export function Item(props: ItemProps) {
  const { icon, title, desc, pos } = props

  function getClassByPosType(posType: PosType) {
    switch (posType) {
      case 'left-right':
        return styles.itemLeftRight
      case 'top-down':
        return styles.itemTopDown
      default:
        return styles.itemLeftRight
    }
  }

  return (
    <div className={styles.itemWrapper}>
      <div className={classnames(styles.item, getClassByPosType(pos))}>
        <div className={styles.itemIcon}>{icon}</div>
        <div className={styles.itemContent}>
          <h3 className={styles.itemTitle}>{title}</h3>
          <div className={styles.desc}>{desc}</div>
        </div>
      </div>
    </div>
  )
}
