/**
 * @file 视频冷存储行业痛点 index.tsx
 * @description 包含视频冷存储行业痛点
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureIcon
} from 'components/Product/Feature'

import industryIconOne from './industry-icon-one.png'
import industryIconTwo from './industry-icon-two.png'
import industryIconThree from './industry-icon-three.png'

import styles from './style.less'

export default function VcsIndustry() {
  return (
    <Feature name="industry" title="行业痛点">
      <FeatureGroup>
        <FeatureItem
          icon={<FeatureIcon src={industryIconOne} className={styles.icon} />}
          title=""
          align="left"
        >
          <FeatureDesc>归档与合规需求和数据资产化趋势使得存储规模和成本增加，自建存储的研发、管理成本上升</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<FeatureIcon src={industryIconTwo} className={styles.icon} />}
          title=""
          align="left"
        >
          <FeatureDesc>在线视频的访问热度会随着时间变化，而常规方案缺乏有效生命周期管理方案，无法智能处理冷热数据</FeatureDesc>
        </FeatureItem>

        <FeatureItem
          icon={<FeatureIcon src={industryIconThree} className={styles.icon} />}
          title=""
          align="left"
        >
          <FeatureDesc>常规冷备存储方案访问性能不足，无法应对突发访问流量，并且在成本控制下灾备能力不足</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
