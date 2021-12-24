/**
 * @file PC 端全局的注册入口
 * @description 固定在页面右下角
 */

import React from 'react'
import IconTextEntry from 'components/IconTextEntryV2'

import IconHead from './head.svg'
import styles from './style.less'

export default function PcRegisterEntry() {
  return (
    <div className={styles.wrapper}>
      <IconTextEntry
        icon={<IconHead />}
        href="https://portal.qiniu.com/signup"
      >
        免费注册
      </IconTextEntry>
    </div>
  )
}
