import React from 'react'
import { useMobile } from 'hooks/ua'
import Link from 'components/Link'

import netPolice from './net_police.jpg'

import styles from './style.less'

export default function NetPolice() {
  const isMobile = useMobile()
  if (isMobile) {
    return null
  }
  return (
    <Link className={styles.netPolice} href="https://www.qiniu.com/pgc/detail/7c0cec0a85595eb09749d9ef">
      <div>国家网络</div>
      <div>安全宣传周</div>
      <img src={netPolice} alt="公安网警" />
    </Link>
  )
}
