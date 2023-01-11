/**
 * @file: 音画质量分析 产品功能
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureIcon
} from 'components/Product/Feature'

import icon1 from './icon1.png'
import icon2 from './icon2.png'
import icon3 from './icon3.png'

export default function Functions() {
  return (
    <Feature name="functions" title="产品功能">
      <FeatureGroup>
        <FeatureItem
          icon={<FeatureIcon src={icon1} />}
          title="视频/图片画质质量评估"
          align="left"
        >
          <FeatureDesc>分析视频/图片资源的画质质量，返回质量 MOS 评估分值。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<FeatureIcon src={icon2} />}
          title="视频/图片美学质量评估"
          align="left"
        >
          <FeatureDesc>分析视频/图片资源的美观度质量，返回美观度 AES 评估分值。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<FeatureIcon src={icon3} />}
          title="视频/图片质量客观维度分析"
          align="left"
        >
          <FeatureDesc>分析视频/图片资源多个客观维度的质量指标，辅助定位具体质量问题</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
