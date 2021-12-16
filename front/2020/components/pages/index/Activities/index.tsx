import React, { ReactNode, PropsWithChildren } from 'react'

import {
  Card as UICard, Title, Desc, Content
} from 'components/UI/Card'
import Link from 'components/Link'
import { Activity } from 'apis/admin/homepage'

import styles from './style.less'

interface CardProps {
  icon: ReactNode
  title: string
  banner?: string
  bannerBg?: string
  href?: string
}

function Card({ icon, title, banner, bannerBg = '#FA8C16', href, children }: PropsWithChildren<CardProps>) {
  banner = banner?.trim()
  return (
    <Link className={styles.container} href={href}>
      <UICard className={styles.card}>
        {icon}
        {banner ? <div className={styles.banner} style={{ background: bannerBg }}>{banner}</div> : null}
        <Content className={styles.cardContent}>
          <Title className={styles.title}>{title}</Title>
          <Desc className={styles.desc}>{children}</Desc>
        </Content>
      </UICard>
    </Link>
  )
}

// lable值集合，不在此集合内则直接取值
const labelMap = {
  hot: 'HOT',
  new: 'NEW'
} as { [k: string]: string }

export default function Activities({ activities }: { activities: Activity[] }) {
  const cardsView = activities
    .map(({ title, subTitle, icon, label, link }, i) => (
      <Card
        key={i}
        icon={<div className={styles.icon} style={{ backgroundImage: `url(${icon})` }}></div>}
        title={title}
        href={link}
        banner={labelMap[label] || label}
      >
        {subTitle}
      </Card>
    ))

  return (
    <div className={styles.activities}>
      <div className={styles.content}>
        {cardsView}
      </div>
    </div>
  )
}
