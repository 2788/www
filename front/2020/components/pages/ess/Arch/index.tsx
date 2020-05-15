/**
 * @file 监控视频边缘存储方案架构 index.tsx
 * @description 包含监控视频边缘存储方案架构
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'

import ArchImg from './arch-img.svg'

import styles from './style.less'

export default function EssArch() {
  return (
    <Section name="arch" title="方案架构">
      <ArchImg className={styles.img} />
    </Section>
  )
}
