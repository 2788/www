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

import core1Icon from './images/智能可靠.png'
import core2Icon from './images/灵活介入.png'
import core3Icon from './images/功能丰富.png'
import core4Icon from './images/识别准确.png'

import styles from './style.less'

function DescItem({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.descItem}>
      <p className={styles.content}>{children}</p>
    </div>
  )
}

function Icon({ src, alt }: { src: string, alt: string }) {
  return (
    <img className={styles.icon} src={src} alt={alt} />
  )
}

export default function DoraCore() {
  return (
    <Feature name="advantages" title="产品优势">
      <FeatureGroup>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Icon src={core1Icon} alt="稳定可靠" />}
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
          icon={<Icon src={core2Icon} alt="灵活接入" />}
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
          icon={<Icon src={core3Icon} alt="功能丰富" />}
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
          icon={<Icon src={core4Icon} alt="识别准确" />}
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
