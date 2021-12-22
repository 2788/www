/**
 * @file 产品架构
 */

import React from 'react'
import Section from 'components/Product/Section'

import Image from './image.svg'
import styles from './style.less'

export default function Architecture() {
  return (
    <Section name="arch" title="产品架构">
      <Image className={styles.image} />
    </Section>
  )
}
