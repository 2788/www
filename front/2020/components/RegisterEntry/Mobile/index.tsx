/**
 * @file 移动端全局的注册入口
 * @description 固定在页面底部
 */

import React from 'react'
import Link from 'components/Link'
import styles from './style.less'

export default function MobileRegisterEntry() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.fixed}>
        <Link className={styles.link} href="https://portal.qiniu.com/signup">注册</Link>
      </div>
    </div>
  )
}
