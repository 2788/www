/**
 * @file 短视频端到端解决方案 index.tsx
 * @description 包含短视频端到端解决方案
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'

import styles from './style.less'

export default function PlsvSolution() {
  return (
    <Section
      name="solution"
      title="解决方案"
      header="端到端的解决方案"
      subtitile="一站式短视频服务，让你专注核心业务创新"
      grey
    >
      <div className={styles.wrapper}>TODO</div>
    </Section>
  )
}
