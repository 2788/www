/**
 * @file pili应用场景 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import Section from 'components/Product/Section'
import Architecture from './images/architecture.svg'
import styles from './style.less'

export default function Arch() {
  return (
    <Section name="architecture" title="产品架构">
      <Architecture className={styles.icon} />
    </Section>
  )
}
