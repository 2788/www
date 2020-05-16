/**
 * @file 视频冷存储方案优势 index.tsx
 * @description 包含视频冷存储方案优势
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

export default function VcsAdvantage() {
  return (
    <Feature name="advantage" title="方案优势" grey>
      <FeatureGroup>
        <FeatureItem
          icon={<AdvantageIconOne className={styles.icon} />}
          title="高可用低成本"
          pos="left-right"
        >
          <FeatureDesc>七牛云独有的三机房纠删码方案，生命周期管理，相较于常规存储方案，存储成本降低 60%。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<AdvantageIconTwo className={styles.icon} />}
          title="高吞吐低时延"
          pos="left-right"
        >
          <FeatureDesc>七牛云可承载 100Gbps 以上突发流量，访问时延可控制在 50ms 以内，聚合写入性能在 50Gbps 以上。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          icon={<AdvantageIconThree className={styles.icon} />}
          title="增量数据同步"
          pos="left-right"
        >
          <FeatureDesc>七牛云支持与源站同步保持数据更新，异步的拉取数据，且时间、带宽、并发均可控。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<AdvantageIconFour className={styles.icon} />}
          title="无忧数据迁移"
          pos="left-right"
        >
          <FeatureDesc>七牛云有着多种久经验证的数据迁移方案，覆盖线上线下全场景，简单，可信赖。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
