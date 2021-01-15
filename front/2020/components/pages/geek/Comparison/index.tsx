/**
 * @file: 低延时直播 Geek 效果对比
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import Section from 'components/Product/Section'
import styles from './style.less'
import comparisonVideo from './comparison.mp4'

export default function Comparison() {
  return (
    <Section name="comparison" title="效果对比">
      <div className={styles.videoCard}>
        <video className={styles.video} src={comparisonVideo} controls />
      </div>
    </Section>
  )
}
