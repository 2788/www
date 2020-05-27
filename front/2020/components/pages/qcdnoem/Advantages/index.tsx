/**
 * @file cdn oem 页产品优势 Component
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

export default function Advantages() {
  return (
    <Section grey className={styles.advantages} header="成为七牛 OEM 合作伙伴的优势" title="合作伙伴优势" name="advantages">
      <Advantage title="方便易用">零门槛接入，一键获取七牛CDN产品</Advantage>
      <Advantage title="全站定制">打造您自己的品牌和服务口碑</Advantage>
      <Advantage title="提升收入">利用财务激励和特惠提供业务机会</Advantage>
      <Advantage title="高效服务">获取七牛专业的产品技术支持，后续无忧技术保障</Advantage>
      <Advantage title="技术支持">七牛 CDN 服务数十万客户，具有良好的技术服务基础</Advantage>
    </Section>
  )
}
