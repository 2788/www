/**
 * @file: 音画质量分析 核心优势
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'
import Icon1 from './icon1.svg'
import Icon2 from './icon2.svg'
import Icon3 from './icon3.svg'
import Icon4 from './icon4.svg'

export default function Advantages() {
  return (
    <Feature title="核心优势">
      <FeatureGroup>
        <FeatureItem
          icon={<Icon1 />}
          title="算法领先"
          align="left"
        >
          <FeatureDesc>利用大规模的专家标注样本训练深度网络，具有业内领先的质量评估算法模型。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<Icon2 />}
          title="功能全面"
          align="left"
        >
          <FeatureDesc>支持图片/视频的画质、美观度等质量评估，同时可精准输出多维度的客观质量指标，指导定位具体质量问题。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<Icon3 />}
          title="接入方便"
          align="left"
        >
          <FeatureDesc>服务接入简单快捷，并提供全流程技术支持。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<Icon4 />}
          title="服务稳定"
          align="left"
        >
          <FeatureDesc>提供弹性服务，扩展性好，算法持续迭代优化。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}