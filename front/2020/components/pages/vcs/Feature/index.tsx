/**
 * @file 视频冷存储 banner 下面的提示位 index.tsx
 * @description 包含视频冷存储 banner 下面的提示位
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import FeatureIconOne from './feature-icon-one.svg'
import FeatureIconTwo from './feature-icon-two.svg'
import FeatureIconThree from './feature-icon-three.svg'
import FeatureIconFour from './feature-icon-four.svg'

import styles from './style.less'

export default function VcsFeature() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.item}>
          <FeatureIconOne className={styles.icon} />
          <p className={styles.desc}>成本下降 60%</p>
        </div>

        <div className={styles.item}>
          <FeatureIconTwo className={styles.icon} />
          <p className={styles.desc}>时延 ≤ 50 ms</p>
        </div>

        <div className={styles.item}>
          <FeatureIconThree className={styles.icon} />
          <p className={styles.desc}>突发流量承载 100 Gbps +</p>
        </div>

        <div className={styles.item}>
          <FeatureIconFour className={styles.icon} />
          <p className={styles.desc}>写入性能 50 Gbps +</p>
        </div>
      </div>
    </div>
  )
}
