/**
 * @author yinxulai <yinxulai@qiniu.com>
 */

import React from 'react'

import styles from './style.less'
import image01 from './images/01.png'
import image02 from './images/02.png'
import image03 from './images/03.png'
import image04 from './images/04.png'

export interface Props {}

export default function SelectionRules(_props: Props) {
  interface Block {
    icon: string
    title: string
    description: string
  }

  const renderItem = (item: Block) => (
    <div key={item.title} className={styles.item}>
      <img className={styles.icon} src={item.icon} />
      <div className={styles.content}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.desc}>{item.description}</div>
      </div>
    </div>
  )

  const data: Block[] = [
    {
      icon: image01,
      title: '功能完成度、丰富度（50%）',
      description: '完成题目中的基础功能，尽可能多的实现挑战性目标'
    },
    {
      icon: image02,
      title: '架构设计（30%）',
      description: '清晰表达架构设计意图，以及架构的合理性'
    },
    {
      icon: image03,
      title: '代码风格（10%）',
      description: '良好的编程风格，注重代码可复用性、可阅读性'
    },
    {
      icon: image04,
      title: '团队协作（10%）',
      description: '团队分工合理性，如单人参赛本项得分将以所有参赛团队平均分计算'
    }
  ]

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {data.map(renderItem)}
      </div>
    </div>
  )
}
