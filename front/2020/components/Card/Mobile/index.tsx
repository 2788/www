import React, { ReactNode } from 'react'

import styles from './style.less'

export interface Props {
  title: string
  desc: ReactNode
}

export default function Item({ title, desc }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
    </div>
  )
}
