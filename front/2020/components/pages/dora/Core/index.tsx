/**
 * @file dora 核心功能及服务 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */
import React, { PropsWithChildren } from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import CheckedIcon from './images/checked.svg'
import Core1Icon from './images/智能可靠.svg'
import Core2Icon from './images/灵活介入.svg'
import Core3Icon from './images/功能丰富.svg'
import Core4Icon from './images/识别准确.svg'

import styles from './style.less'

function DescItem({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.descItem}>
      <CheckedIcon className={styles.icon} />
      <p className={styles.content}>{children}</p>
    </div>
  )
}

export default function DoraCore() {
  return (
    <Feature name="advantages" title="产品优势">
      <FeatureGroup>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Core1Icon className={styles.featureIcon} />}
          title="稳定可靠"
        >
          <FeatureDesc>
            <DescItem>近千台高性能物理机组成的处理集群，可应对高并发处理需求</DescItem>
            <DescItem>每日处理请求数百亿次，服务可用性达到 99.99%</DescItem>
          </FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Core2Icon className={styles.featureIcon} />}
          title="灵活接入"
        >
          <FeatureDesc>
            <DescItem>成熟完善 SDK 和 API ，调用方式简单，缩短产品开发运维时间</DescItem>
            <DescItem>专业服务团队 7 * 24 小时服务</DescItem>
          </FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Core3Icon className={styles.featureIcon} />}
          title="功能丰富"
        >
          <FeatureDesc>
            <DescItem>丰富的媒体处理功能满足各种图片、音视频应用场景</DescItem>
            <DescItem>高可扩展的媒体处理模板，支持自定义处理，满足多样化的媒体数据处理需求</DescItem>
          </FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Core4Icon className={styles.featureIcon} />}
          title="识别准确"
        >
          <FeatureDesc>
            <DescItem>内容审核、场景识别、物体检测功能处于业界领先水平</DescItem>
            <DescItem>平均复审率低于 10%，大幅降低运营成本</DescItem>
          </FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
