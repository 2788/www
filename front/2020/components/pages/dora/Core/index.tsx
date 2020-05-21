/**
 * @file dora 核心功能及服务 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import CoreIconFile from './core-icon-file.svg'
import CoreIconChart from './core-icon-chart.svg'

import styles from './style.less'

export default function DoraCore() {
  return (
    <Feature name="advantages" title="产品优势">
      <FeatureGroup>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<CoreIconFile className={styles.featureIcon} />}
          title="多媒体数据处理"
        >
          <FeatureDesc>基于对象存储，您可以一站式地完成图片处理和音视频处理。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<CoreIconChart className={styles.featureIcon} />}
          title="跨区域同步"
        >
          <FeatureDesc>跨区域同步让用户通过简单操作即可对不同存储区域的数据进行高效迁移和同步，实现数据异地容灾。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<CoreIconFile className={styles.featureIcon} />}
          title="生命周期管理"
        >
          <FeatureDesc>生命周期管理让用户可以根据业务需要，为存储空间制定规则，存储对象可自动化定时进行存储类型转化或删除操作。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<CoreIconFile className={styles.featureIcon} />}
          title="低频存储"
        >
          <FeatureDesc>低频存储提供了比标准存储更低的价格，适用于数据访问实时，读取频率较低的业务场景（如企业数据备份、监控数据、网盘应用等）。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
