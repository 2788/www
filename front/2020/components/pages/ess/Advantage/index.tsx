/**
 * @file 监控视频边缘存储方案优势 index.tsx
 * @description 包含监控视频边缘存储方案优势
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import AdvantageIconOne from './advantage-icon-one.svg'
import AdvantageIconTwo from './advantage-icon-two.svg'
import AdvantageIconThree from './advantage-icon-three.svg'

import styles from './style.less'

export default function EssAdvantage() {
  return (
    <Feature name="advantage" title="方案优势" grey>
      <FeatureGroup>
        <FeatureItem
          icon={<AdvantageIconOne className={styles.icon} />}
          title="传输高速可靠"
          align="left"
        >
          <FeatureDesc>多维调度策略选取传输链路，保障传输高速可靠，可充分利用链路带宽。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<AdvantageIconTwo className={styles.icon} />}
          title="数据多重保护"
          align="left"
        >
          <FeatureDesc>对数据传输及存储采用网银级加密保护，边缘可自定义处理敏感数据，及时脱敏。</FeatureDesc>
        </FeatureItem>

        <FeatureItem
          icon={<AdvantageIconThree className={styles.icon} />}
          title="全面兼容扩展"
          align="left"
        >
          <FeatureDesc>兼容七牛云对象存储已有功能特性及接口，支持与边缘计算相结合，拓展边缘智能。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
