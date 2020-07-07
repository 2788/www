/**
 * @file 存储产品优势 index.tsx
 * @description 包含存储产品优势
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import Icon4 from './images/icon4.svg'
import Icon5 from './images/icon5.svg'
import Icon6 from './images/icon6.svg'

export default function KodoAdvantage() {
  return (
    <Feature name="advantage" title="产品优势" grey>
      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<Icon1 />}
          title="高可靠"
        >
          <FeatureDesc>业界领先的纠删码存储方案，能够提供高达 11 个 9 的数据可靠性。跨数据中心的副本冗余，能够保障服务的超高可用性。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="left-right"
          icon={<Icon2 />}
          title="易扩展"
        >
          <FeatureDesc>利用七牛云对象存储，您的存储空间无上限的同时也无需担心扩容问题。您能够实现存储需求的弹性伸缩，从而提高业务灵活性。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<Icon3 />}
          title="低成本"
        >
          <FeatureDesc>您无需前期投入。七牛云对象存储按需使用、按需付费的便捷性，能够有效避免存储及带宽资源的闲置浪费。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="left-right"
          icon={<Icon4 />}
          title="数据智能化"
        >
          <FeatureDesc>与七牛云其他产品紧密协同，提供标准 HDFS 访问方式，为大数据和机器学习的海量高速读写场景进行了大量优化。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<Icon5 />}
          title="存储加速"
        >
          <FeatureDesc>边缘存储可充分利用可用链路带宽，数据在边缘节点上传和下载可平均提速 60% 以上。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="left-right"
          icon={<Icon6 />}
          title="边缘计算"
        >
          <FeatureDesc>就近集成边缘计算及边缘缓存服务，边缘存储节点具备本地数据处理能力。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}