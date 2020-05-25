import React, { ReactNode, PropsWithChildren } from 'react'

import {
  Card as UICard, Title, Desc, Content
} from 'components/UI/Card'

import BaseServiceIconn from './images/base-service.svg'

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

export default function Activities() {
  return (
    <div className={styles.activities}>
      <Card icon={<BaseServiceIconn />} title="对象存储">热门活动及产品特惠</Card>
      <Card icon={<BaseServiceIconn />} title="归档存储">热门活动及产品特惠</Card>
      <Card icon={<BaseServiceIconn />} title="AI训练">热门活动及产品特惠</Card>
      <Card icon={<BaseServiceIconn />} title="HDFS">热门活动及产品特惠</Card>
    </div>
  )
}
