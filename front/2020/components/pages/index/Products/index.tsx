import React, { ReactNode, PropsWithChildren, useState } from 'react'
import QueueAnim from 'rc-queue-anim'

import Section from 'components/Product/Section'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Card as UICard, Title, Content, Desc } from 'components/UI/Card'
import { Product } from 'constants/products'
import ProductIcon from 'components/Product/Icon'

import styles from './style.less'

interface CardProps {
  icon: ReactNode
  title: string
}

function Card({ icon, title, children }: PropsWithChildren<CardProps>) {
  return (
    <UICard className={styles.card}>
      {icon}
      <Content className={styles.content}>
        <Title className={styles.title}>{title}</Title>
        <Desc className={styles.desc}>{children}</Desc>
      </Content>
    </UICard>
  )
}

interface AnimProps {
  active: boolean
}

function Anim({ active, children }: PropsWithChildren<AnimProps>) {
  return (
    <QueueAnim
      delay={300}
      ease="easeInOutCubic"
    >
      {
        active
        ? children
        : null
      }
    </QueueAnim>
  )
}

export default function Products() {
  const [activeKey, setActiveKey] = useState('1')
  const onTabChange = (key: string) => {
    setActiveKey(key)
  }
  return (
    <Section title="云产品" name="products">
      <div className={styles.products}>
        <Tabs defaultValue="1" onChange={onTabChange}>
          <TabPane value="1" tab="存储与数据湖">
            <Anim active={activeKey === '1'}>
              <Card key="1" icon={<ProductIcon product={Product.Kodo} />} title="对象存储">自然场景下对整图和文字进行检测、定位和识别</Card>
              <Card key="2" icon={<ProductIcon product={Product.Kodo} />} title="归档存储">自然场景下对整图和文字进行检测、定位和识别</Card>
              <Card key="4" icon={<ProductIcon product={Product.Hdfs} />} title="HDFS">自然场景下对整图和文字进行检测、定位和识别</Card>
              <Card key="5" icon={<ProductIcon product={Product.Kodo} />} title="FS">自然场景下对整图和文字进行检测、定位和识别</Card>
            </Anim>
          </TabPane>
          <TabPane value="2" tab="基础服务">
            <Anim active={activeKey === '2'}>
              <Card key="1" icon={<ProductIcon product={Product.Cdn} />} title="CDN">高可用、易扩展、低成本、一站式、支持边缘存储</Card>
              <Card key="2" icon={<ProductIcon product={Product.Ssl} />} title="证书">自然场景下对整图和文字进行检测、定位和识别超出两行的情况</Card>
              <Card key="3" icon={<ProductIcon product={Product.Pili} />} title="直播">自然场景下对整图和文字进行检测、定位和识别超出两行的情况</Card>
              <Card key="4" icon={<ProductIcon product={Product.Qvm} />} title="云主机">自然场景下对整图和文字进行检测、定位和识别</Card>
              <Card key="5" icon={<ProductIcon product={Product.Sms} />} title="云短信">自然场景下对整图和文字进行检测、定位和识别</Card>
            </Anim>
          </TabPane>
          <TabPane value="3" tab="智能视频">
            <Anim active={activeKey === '3'}>
              <Card key="1" icon={<ProductIcon product={Product.Dora} />} title="智能多媒体服务">高可用、易扩展、低成本、一站式、支持边缘存储</Card>
              <Card key="2" icon={<ProductIcon product={Product.Censor} />} title="内容安全">自然场景下对整图和文字进行检测、定位和识别超出两行的情况</Card>
              <Card key="3" icon={<ProductIcon product={Product.Pili} />} title="实时音视频">自然场景下对整图和文字进行检测、定位和识别超出两行的情况</Card>
              <Card key="4" icon={<ProductIcon product={Product.Rtn} />} title="短视频 SDK">自然场景下对整图和文字进行检测、定位和识别</Card>
              <Card key="5" icon={<ProductIcon product={Product.Rtn} />} title="推流 SDK">自然场景下对整图和文字进行检测、定位和识别超出两行的情况</Card>
            </Anim>
          </TabPane>
          <TabPane value="4" tab="机器数据智能">
            <Anim active={activeKey === '4'}>
              <Card key="1" icon={<ProductIcon product={Product.Kodo} />} title="对象存储">自然场景下对整图和文字进行检测、定位和识别</Card>
              <Card key="2" icon={<ProductIcon product={Product.Archive} />} title="归档存储">自然场景下对整图和文字进行检测、定位和识别</Card>
              <Card key="3" icon={<ProductIcon product={Product.Kodo} />} title="AI训练">自然场景下对整图和文字进行检测、定位和识别</Card>
              <Card key="4" icon={<ProductIcon product={Product.Hdfs} />} title="HDFS">自然场景下对整图和文字进行检测、定位和识别</Card>
              <Card key="5" icon={<ProductIcon product={Product.Kodo} />} title="FS">自然场景下对整图和文字进行检测、定位和识别</Card>
            </Anim>
          </TabPane>
        </Tabs>
      </div>
    </Section>
  )
}
