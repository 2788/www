/**
 * @file component ActivityEnd
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import * as styles from './style.m.less'

export const activityEndPagePath = '/activity-end'

export default function ActivityEnd() {

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.img}></div>
      <p
        className={styles.toGatherPage}
        title="全部活动">
        去看看&nbsp;<a href="/activity/all">其他活动</a>&nbsp;吧~
      </p>
    </div>
  )
}
