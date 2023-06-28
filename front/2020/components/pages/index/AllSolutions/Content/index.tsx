import React, { ReactNode } from 'react'

import styles from './style.less'

export interface Props {
  title: string
  desc: string
  imgUrl: string
  children: ReactNode
}

export default function Content({ title, desc, imgUrl, children }: Props) {
  return (
    <div className={styles.content}>
      <div className={styles.detail}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{desc}</p>
        <div className={styles.links}>{children}</div>
      </div>
      <img src={imgUrl} className={styles.bg} alt="background" />
    </div>
  )
}
