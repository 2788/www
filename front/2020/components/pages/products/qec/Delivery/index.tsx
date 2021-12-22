/**
 * @file 交付模式
 */

import React, { ReactNode } from 'react'
import Section from 'components/Product/Section'
import { Row } from 'components/UI/Card'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'
import { useMobile } from 'hooks/ua'

import Img1 from './img1.svg'
import Img2 from './img2.svg'

import styles from './style.less'

export default function Delivery() {
  const isMobile = useMobile()
  if (isMobile) {
    return <Mobile />
  }
  return (
    <Section name="delivery" title="交付模式">
      <Row>
        <Card img={<Img1 />} title="订阅模式" desc="无需自建资源池，无需动手运维，省时省力，价格实惠。" />
        <Card img={<Img2 />} title="授权模式" desc="一体机或 License 授权交付，提供企业云化的基础环境，快速改造上云。" />
      </Row>
    </Section>
  )
}

function Card({ img, title, desc }: { img: ReactNode, title: string, desc: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.img}>{img}</div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </div>
    </div>
  )
}

function Mobile() {
  return (
    <Feature name="delivery" title="交付模式" withTailPadding>
      <FeatureGroup>
        <FeatureItem
          icon={<Img1 />}
          title="订阅模式"
          align="left"
        >
          <FeatureDesc>无需自建资源池，无需动手运维，省时省力，价格实惠。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          icon={<Img2 />}
          title="授权模式"
          align="left"
        >
          <FeatureDesc>一体机或 License 授权交付，提供企业云化的基础环境，快速改造上云。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
