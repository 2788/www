import React from 'react'
import { useMobile } from 'hooks/ua'
import netPolice from './net_police.jpg'

import styles from './style.less'

export default function NetPolice() {
  const isMobile = useMobile()
  if (isMobile) {
    return null
  }
  return (
    <div className={styles.netPolice}>
      <img src={netPolice} alt="公安网警" />
    </div>
  )
}
