/**
 * @author yinxulai <yinxulai@qiniu.com>
 */

import React from 'react'
import styles from './style.less'

export interface Props {
}

export default function JudgesLineup(props: Props) {
  return (
    <p className={styles.root}>
      {JSON.stringify(props)}
    </p>
  )
}
