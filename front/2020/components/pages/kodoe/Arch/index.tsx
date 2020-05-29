/**
 * @file 私有云存储方案架构 index.tsx
 * @description 包含私有云存储方案架构
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'

import archImg from './arch-img.png'

import styles from './style.less'

export default function KodoeArch() {
  return (
    <Section name="arch" title="方案架构">
      <img src={archImg} className={styles.img} />
    </Section>
  )
}
