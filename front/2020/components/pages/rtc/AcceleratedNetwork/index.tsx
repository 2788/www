/**
 * @file rtc 加速网络 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'

import Section from 'components/Product/Section'

import styles from './style.less'

interface AdvantageProps {
  title: string
}

function Advantage({ title, children }: PropsWithChildren<AdvantageProps>) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.item}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{children}</p>
      </div>
    </div>
  )
}

export function Advantages() {
  return (
    <div className={styles.advantages}>
      <Advantage title="方便易用">零门槛接入，一键获取七牛CDN产品</Advantage>
      <Advantage title="全站定制">打造您自己的品牌和服务口碑</Advantage>
      <Advantage title="提升收入">利用财务激励和特惠提供业务机会</Advantage>
      <Advantage title="高效服务">获取七牛专业的产品技术支持，后续无忧技术保障</Advantage>
      <Advantage title="技术支持">七牛 CDN 服务数十万客户，具有良好的技术服务基础</Advantage>
    </div>
  )
}

export default function AcceleratedNetwork() {
  return (
    <Section header="自研 RTC 加速网络" title="加速网络" subtitile="自研边缘加速方案，实现全球信息实时共享" name="accelerated-network">
      <Advantages />
    </Section>
  )
}
