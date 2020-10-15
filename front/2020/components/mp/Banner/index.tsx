import React, { CSSProperties, ReactNode } from 'react'

import styles from './index.less'

export type BannerProps = {
  banner: string
  title?: ReactNode
  subtitle?: ReactNode
  style?: CSSProperties
  onClick?: () => void
}

export default function Banner({ banner, title, subtitle, style, onClick }: BannerProps) {
  return (
    <div className={styles.banner} style={style} onClick={onClick}>
      <img src={banner} alt="banner" />
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  )
}
