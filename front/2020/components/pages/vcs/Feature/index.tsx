/**
 * @file 视频冷存储 banner 下面的提示位 index.tsx
 * @description 包含视频冷存储 banner 下面的提示位
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import BannerFooter from 'components/Solution/BannerFooter'
import { Icon } from 'components/Product/Feature'

import featureIconOne from './feature-icon-one.png'
import featureIconTwo from './feature-icon-two.png'
import featureIconThree from './feature-icon-three.png'
import featureIconFour from './feature-icon-four.png'

import styles from './style.less'

export default function VcsFeature() {
  return (
    <BannerFooter className={styles.wrapper}>
      <div className={styles.item}>
        <Icon src={featureIconOne} className={styles.icon} />
        <p className={styles.desc}>成本下降 60%</p>
      </div>

      <div className={styles.item}>
        <Icon src={featureIconTwo} className={styles.icon} />
        <p className={styles.desc}>时延 ≤ 50 ms</p>
      </div>

      <div className={styles.item}>
        <Icon src={featureIconThree} className={styles.icon} />
        <p className={styles.desc}>突发流量承载 100 Gbps +</p>
      </div>

      <div className={styles.item}>
        <Icon src={featureIconFour} className={styles.icon} />
        <p className={styles.desc}>写入性能 50 Gbps +</p>
      </div>
    </BannerFooter>
  )
}
