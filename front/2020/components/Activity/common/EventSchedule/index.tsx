/**
 * @author yinxulai <yinxulai@qiniu.com>
 */

import React from 'react'

import styles from './style.less'

export interface Props {
}

export default function EventSchedule(_props: Props) {
  interface Step {
    title: string
    date: string
  }

  const steps: Step[] = [
    {
      title: '开启报名',
      date: '9月27日'
    },
    {
      title: '截止报名',
      date: '10月31日'
    },
    {
      title: '截止提交作品',
      date: '11月07日'
    },
    {
      title: '初评入围结果公布',
      date: '11月10日'
    },
    {
      title: '决赛路演',
      date: '11月12日'
    },
    {
      title: '颁奖典礼 & AI 集训营',
      date: '11月18日'
    }
  ]

  const renderStep = (item: Step) => (
    <div key={item.title} className={styles.stepItem}>
      <div className={styles.point}>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.date}>{item.date}</div>
      </div>
    </div>
  )

  return (
    <div className={styles.root}>
      {steps.map(renderStep)}
    </div>
  )
}
