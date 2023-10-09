import React, { ReactNode, PropsWithChildren } from 'react'
import classnames from 'classnames'
import { chunk } from 'lodash'

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

interface RawProps {
  children: ReactNode[]
  maxColumnsPerRow: number
}

export function Raw({ children, maxColumnsPerRow }: RawProps) {
  const isMobile = useMobile()

  const itemsRows: ReactNode[][] = chunk(children, maxColumnsPerRow)

  if (!children) {
    return null
  }

  return (
    <div className={isMobile ? styles.mobileWrapper : styles.pcWrapper}>
      {itemsRows.map((items, index) => (
        <Group key={index}>
          {items}
          {index === itemsRows.length - 1 && items.length < maxColumnsPerRow && (
            [...new Array(maxColumnsPerRow - items.length).keys()].map(item => <EmptyItem key={item} />)
          )}
        </Group>
      ))}
    </div>
  )
}

function Group({ children }: PropsWithChildren<{}>) {
  if (!children) {
    return null
  }

  return (
    <div className={styles.groupWrapper}>
      {children}
    </div>
  )
}

function EmptyItem() {
  return (
    <div className={styles.emptyItem}></div>
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

interface VerticalDetailItemProps {
  title: string
  desc: string
  bgImgUrl?: string
}

export function VerticalImgItem(props: VerticalDetailItemProps) {
  const { title, desc, bgImgUrl = '' } = props
  const isMobile = useMobile()

  return (
    <div className={styles.verticalDetailItem}>
      <div className={styles.imgWrapper}>
        <img src={bgImgUrl} alt={title} />
      </div>
      <div className={styles.content}>
        {!isMobile && <div className={styles.title}>{title}</div>}
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
  )
}
