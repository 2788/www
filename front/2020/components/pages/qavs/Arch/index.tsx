/**
 * @file 智能视频云方案架构 index.tsx
 * @description 包含智能视频云方案架构
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'

import ArchImg from './arch-img.svg'

import styles from './style.less'

export default function QavsArch() {
  return (
    <Section name="arch" title="方案架构" header="一站式智能视频云专属服务">
      <ArchImg className={styles.img} />
    </Section>
  )
}
