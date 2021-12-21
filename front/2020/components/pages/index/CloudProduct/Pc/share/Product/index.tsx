import React, { ReactNode } from 'react'

import styles from './index.less'

export type Props = {
  icon: ReactNode
  textArea: ReactNode
}
export default function Product({ icon, textArea }: Props) {
  return (
    <div className={styles.product}>
      <div>{icon}</div>
      <div className={styles.textarea}>{textArea}</div>
    </div>
  )
}
