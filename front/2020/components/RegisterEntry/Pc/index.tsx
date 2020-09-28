/**
 * @file PC 端全局的注册入口
 * @description 固定在页面右下角
 */

import React from 'react'
import Link from 'components/Link'

import IconHead from './head.svg'
import styles from './style.less'

export default function PcRegisterEntry() {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href="https://portal.qiniu.com/signup">
        <IconHead className={styles.icon} />
        <span className={styles.text}>免费<br />注册</span>
      </Link>
    </div>
  )
}
