/**
 * @file 监控视频边缘存储独特功能 index.tsx
 * @description 包含监控视频边缘存储独特功能
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import UniqueIconOne from './unique-icon-one.svg'
import UniqueIconTwo from './unique-icon-two.svg'
import UniqueIconThree from './unique-icon-three.svg'

import styles from './style.less'

export default function EssUnique() {
  return (
    <Feature name="unique" title="独特功能">
      <FeatureGroup>
        <FeatureItem
          icon={<UniqueIconOne className={styles.icon} />}
          title="就近高速上传"
          align="left"
        >
          <FeatureDesc>选取就近边缘节点，多维调度智能选取优质链路，保障监控视频数据上传至边缘</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<UniqueIconTwo className={styles.icon} />}
          title="自动同步中心"
          align="left"
        >
          <FeatureDesc>边缘数据自动同步至中心备份，保证数据完整性及安全性，同时支持用户主动备份至云存储</FeatureDesc>
        </FeatureItem>

        <FeatureItem
          icon={<UniqueIconThree className={styles.icon} />}
          title="全网实时查看"
          align="left"
        >
          <FeatureDesc>采用多策略多层次调度，智能选取优质线路，保障用户可全网实时查看监控视频，且支持最高 64 倍速播放</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
