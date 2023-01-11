/**
 * @file 监控视频边缘存储独特功能 index.tsx
 * @description 包含监控视频边缘存储独特功能
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureIcon
} from 'components/Product/Feature'

import uniqueIconOne from './unique-icon-one.png'
import uniqueIconTwo from './unique-icon-two.png'
import uniqueIconThree from './unique-icon-three.png'

export default function EssUnique() {
  return (
    <Feature name="unique" title="独特功能">
      <FeatureGroup>
        <FeatureItem
          icon={<FeatureIcon src={uniqueIconOne} />}
          title="就近高速上传"
          align="left"
        >
          <FeatureDesc>选取就近边缘节点，多维调度智能选取优质链路，保障监控视频数据上传至边缘</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<FeatureIcon src={uniqueIconTwo} />}
          title="自动同步中心"
          align="left"
        >
          <FeatureDesc>边缘数据自动同步至中心备份，保证数据完整性及安全性，同时支持用户主动备份至云存储</FeatureDesc>
        </FeatureItem>

        <FeatureItem
          icon={<FeatureIcon src={uniqueIconThree} />}
          title="全网实时查看"
          align="left"
        >
          <FeatureDesc>采用多策略多层次调度，智能选取优质线路，保障用户可全网实时查看监控视频，且支持最高 64 倍速播放</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
