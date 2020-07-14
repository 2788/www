/**
 * @file 短视频方案优势 index.tsx
 * @description 包含短视频方案优势
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import AdvantageIconOne from './advantage-icon-one.svg'
import AdvantageIconTwo from './advantage-icon-two.svg'
import AdvantageIconThree from './advantage-icon-three.svg'
import AdvantageIconFour from './advantage-icon-four.svg'

import styles from './style.less'

export default function PlsvAdvantage() {
  return (
    <Feature name="advantage" title="方案优势" subtitle="化繁为简，轻松上线应用程序">
      <FeatureGroup>
        <FeatureItem
          className={styles.item}
          icon={<AdvantageIconOne className={styles.icon} />}
          title="功能完善，兼容性强"
          align="left"
        >
          <FeatureDesc>涵盖短视频应用的所有主流功能，智能软硬编切换， 兼容所有主流机型</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          className={styles.item}
          icon={<AdvantageIconTwo className={styles.icon} />}
          title="包体轻盈，性能优异"
          align="left"
        >
          <FeatureDesc>可插拔式设计，包体小至 1.5 M，功耗低，内存占用小，速度/效率一流</FeatureDesc>
        </FeatureItem>

        <FeatureItem
          className={styles.item}
          icon={<AdvantageIconThree className={styles.icon} />}
          title="接入简单，方便二次开发"
          align="left"
        >
          <FeatureDesc>3 小时集成短视频，丰富的信令和数据回调，可灵活进行二次开发</FeatureDesc>
        </FeatureItem>

        <FeatureItem
          className={styles.item}
          icon={<AdvantageIconFour className={styles.icon} />}
          title="一站式云端方案"
          align="left"
        >
          <FeatureDesc>提供终端到云端全链路服务，集采集编辑、合成上传、转码、分发到播放于一体</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
