/**
 * @file 私有云存储方案优势 index.tsx
 * @description 包含私有云存储方案优势
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import { useMobile } from 'hooks/ua'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import AdvantageIconOne from './advantage-icon-one.svg'
import AdvantageIconTwo from './advantage-icon-two.svg'
import AdvantageIconThree from './advantage-icon-three.svg'
import AdvantageIconFour from './advantage-icon-four.svg'
import AdvantageIconFive from './advantage-icon-five.svg'

import styles from './style.less'

export default function KodoeAdvantage() {
  const isMobile = useMobile()

  return (
    <Feature name="advantage" title="方案优势" header="私有云存储优势" grey>
      <FeatureGroup>
        <FeatureItem
          icon={<AdvantageIconOne className={styles.icon} />}
          title="灵活的扩展性"
          align="left"
        >
          <FeatureDesc preIcon="check">分布式存储架构支持无限横向扩展， EB 级别容量扩展</FeatureDesc>
          <FeatureDesc preIcon="check">随着节点数的增加，性能可以随容量增长线性扩展</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<AdvantageIconTwo className={styles.icon} />}
          title="加速企业 IT 架构革新"
          align="left"
        >
          <FeatureDesc preIcon="check">一个数据平台打破数据壁垒，助力数据价值挖掘</FeatureDesc>
          <FeatureDesc preIcon="check">企业 IT 架构“云原生”转型</FeatureDesc>
          <FeatureDesc preIcon="check">无缝对接公有云</FeatureDesc>
        </FeatureItem>

        <FeatureItem
          icon={<AdvantageIconThree className={styles.icon} />}
          title="成熟可靠的存储"
          align="left"
        >
          <FeatureDesc preIcon="check">11 个 9 的数据可靠性，自动检查和修复数据</FeatureDesc>
          <FeatureDesc preIcon="check">具备双活及跨地域灾备多中心的服务能力</FeatureDesc>
          <FeatureDesc preIcon="check">公有云多年验证的架构和方案</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          icon={<AdvantageIconFour className={styles.icon} />}
          title="集成多媒体计算"
          align="left"
        >
          <FeatureDesc preIcon="check">集成 AI、图片、音视频处理等服务</FeatureDesc>
          <FeatureDesc preIcon="check">支持自定义数据处理应用、兼容接口协议即可集成</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<AdvantageIconFive className={styles.icon} />}
          title="显著降低成本"
          align="left"
        >
          <FeatureDesc preIcon="check">采用通用 x86 服务器，相对于传统专用存储设备成本降低</FeatureDesc>
          <FeatureDesc preIcon="check">纠删码、存储分层、生命周期管理的支持进一步降低存储空间成本</FeatureDesc>
          <FeatureDesc preIcon="check">管理平台支持智能监控管理，显著降低 TCO</FeatureDesc>
        </FeatureItem>

        {
          isMobile
          ? null
          : (
            <FeatureItem
              icon={null}
              title=""
            >
              <FeatureDesc>{null}</FeatureDesc>
            </FeatureItem>
          )
        }
      </FeatureGroup>
    </Feature>
  )
}
