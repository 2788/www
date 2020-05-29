/**
 * @file 智能视频云方案架构 index.tsx
 * @description 包含智能视频云方案架构
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'

import archImg from './arch-img.png'

import styles from './style.less'

export default function QavsArch() {
  return (
    <Section name="arch" title="方案架构" header="一站式智能视频云专属服务">
      <img src={archImg} alt="方案架构" className={styles.img} />
    </Section>
  )
}
