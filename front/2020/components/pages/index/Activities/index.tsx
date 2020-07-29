import React, { ReactNode, PropsWithChildren } from 'react'

import {
  Card as UICard, Title, Desc, Content
} from 'components/UI/Card'
import Link from 'components/Link'
import { Activity } from 'apis/lego'

import Activity1Icon from './images/activity1.svg'
import Activity2Icon from './images/activity2.svg'
import Activity3Icon from './images/activity3.svg'
import Activity4Icon from './images/activity4.svg'

import styles from './style.less'

interface CardProps {
  icon: ReactNode
  title: string
  banner?: string
  bannerBg?: string
  href?: string
}

function Card({ icon, title, banner, bannerBg = '#FA8C16', href, children }: PropsWithChildren<CardProps>) {
  return (
    <Link className={styles.container} href={href}>
      <UICard className={styles.card}>
        {icon}
        {banner ? <span className={styles.banner} style={{ background: bannerBg }}>{banner}</span> : null}
        <Content className={styles.cardContent}>
          <Title className={styles.title}>{title}</Title>
          <Desc className={styles.desc}>{children}</Desc>
        </Content>
      </UICard>
    </Link>
  )
}

// 目前用固定的 icon，以后看是不是这个也从接口来
const icons = [
  Activity1Icon,
  Activity2Icon,
  Activity3Icon,
  Activity4Icon
]

export default function Activities({ activities }: { activities: Activity[] }) {

  const cardsView = activities.slice(0, 4).map(({ title, subtitle, url, subscript_text, subscript_color }, i) => {
    const Icon = icons[i]
    return (
      <Card
        key={i}
        icon={<Icon className={styles.icon} />}
        title={title}
        href={url}
        banner={subscript_text}
        bannerBg={subscript_color}
      >
        {subtitle}
      </Card>
    )
  })

  return (
    <div className={styles.activities}>
      <div className={styles.content}>
        {cardsView}
      </div>
    </div>
  )
}
