import React, { ReactNode } from 'react'
import classNames from 'classnames'

import styles from './style.less'

export interface Props {
  serial: ReactNode
  title: string
  desc: ReactNode
  bgUrl: string
  popDir: 'up' | 'down'
}

const popDirStyle = {
  up: styles.popDirUp,
  down: styles.popDirDown
}

export default function Item({ serial, title, desc, bgUrl, popDir }: Props) {
  return (
    <div
      className={classNames(styles.card, popDirStyle[popDir])}
      style={{ backgroundImage: `url("${bgUrl}")` }}
    >
      <div className={styles.group}>
        <div className={styles.serial}>{serial}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
  )
}
