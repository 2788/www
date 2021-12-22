/**
 * @file 核心优势
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

import styles from './style.less'

export default function Advantages() {
  return (
    <Feature title="核心优势">
      <FeatureGroup>
        <FeatureItem
          icon={<Icon1 />}
          title="公有云能力，本地化部署"
          align="left"
          className={styles.item}
        >
          <FeatureDesc>保持专有云计算和公有云计算的使用体验一致</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<Icon2 />}
          title="精致规模，极速上线"
          align="left"
          className={styles.item}
        >
          <FeatureDesc>支持计算、存储混合部署，三节点起极速上线</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<Icon3 />}
          title="全面的交付运营服务"
          align="left"
          className={styles.item}
        >
          <FeatureDesc>支持多种部署方式，提供覆盖全国的本地交付与售后维保服务</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<Icon4 />}
          title="超大规模集群管理能力"
          align="left"
          className={styles.item}
        >
          <FeatureDesc>单集群最大规模可达 1000 节点以上</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
