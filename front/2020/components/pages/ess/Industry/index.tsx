/**
 * @file 监控视频边缘存储行业痛点 index.tsx
 * @description 包含监控视频边缘存储行业痛点
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import IndustryIconOne from './industry-icon-one.svg'
import IndustryIconTwo from './industry-icon-two.svg'
import IndustryIconThree from './industry-icon-three.svg'

import styles from './style.less'

export default function EssIndustry() {
  return (
    <Feature name="industry" title="行业痛点" grey>
      <FeatureGroup>
        <FeatureItem
          icon={<IndustryIconOne className={styles.icon} />}
          title="网络链路容错差"
          align="left"
        >
          <FeatureDesc>监控视频直接上传至中心云存储，因链路路由和网络抖动等问题造成网络容错性低，链路不可靠。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<IndustryIconTwo className={styles.icon} />}
          title="带宽利用率低"
          align="left"
        >
          <FeatureDesc>监控视频直接上传至云端会受到链路质量影响无法提速，造成本地带宽利用率低，成本浪费。</FeatureDesc>
        </FeatureItem>

        <FeatureItem
          icon={<IndustryIconThree className={styles.icon} />}
          title="本地存储受限"
          align="left"
        >
          <FeatureDesc>传统监控设备的 SD 或 NVR 的本地存储方案，空间有限，成本较高，读写寿命短，数据安全无法保障且运维复杂。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
