/**
 * @file 存储核心功能及服务 index.tsx
 * @description 包含存储核心功能及服务
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Link as FeatureLink
} from 'components/Product/Feature'

import CoreIconFile from './core-icon-file.svg'
import CoreIconChart from './core-icon-chart.svg'

import styles from './style.less'

export default function KodoCore() {
  return (
    <Feature name="core" title="核心功能及服务">
      <FeatureGroup>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<CoreIconFile className={styles.featureIcon} />}
          title="多媒体数据处理"
        >
          <FeatureDesc>基于对象存储，您可以一站式地完成图片处理和音视频处理。</FeatureDesc>
          <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<CoreIconChart className={styles.featureIcon} />}
          title="跨区域同步"
        >
          <FeatureDesc>跨区域同步让用户通过简单操作即可对不同存储区域的数据进行高效迁移和同步，实现数据异地容灾。</FeatureDesc>
          <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<CoreIconFile className={styles.featureIcon} />}
          title="生命周期管理"
        >
          <FeatureDesc>生命周期管理让用户可以根据业务需要，为存储空间制定规则，存储对象可自动化定时进行存储类型转化或删除操作。</FeatureDesc>
          <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<CoreIconFile className={styles.featureIcon} />}
          title="低频存储"
        >
          <FeatureDesc>低频存储提供了比标准存储更低的价格，适用于数据访问实时，读取频率较低的业务场景（如企业数据备份、监控数据、网盘应用等）。</FeatureDesc>
          <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<CoreIconChart className={styles.featureIcon} />}
          title="镜像存储"
        >
          <FeatureDesc>镜像存储适用于迁移原有业务系统的已有数据。可以帮助用户实现无缝数据迁移，迁移过程中并不影响原有业务系统的访问。</FeatureDesc>
          <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<CoreIconFile className={styles.featureIcon} />}
          title="上传／下载"
        >
          <FeatureDesc>针对不同的上传 / 下载场景，七牛云提供了丰富的 API 接口和工具供用户使用，同时支持服务端上传和客户端直传，并提供加速服务。</FeatureDesc>
          <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
