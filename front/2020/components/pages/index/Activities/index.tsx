import React, { ReactNode, PropsWithChildren } from 'react'

import {
  Card as UICard, Title, Desc, Content
} from 'components/UI/Card'
import Link from 'components/Link'

import Activity1Icon from './images/activity1.svg'
import Activity2Icon from './images/activity2.svg'
import Activity3Icon from './images/activity3.svg'
import Activity4Icon from './images/activity4.svg'

import styles from './style.less'

interface CardProps {
  icon: ReactNode
  title: string
  banner?: string
  href?: string
}

function Card({ icon, title, banner, href, children }: PropsWithChildren<CardProps>) {
  return (
    <Link className={styles.container} href={href}>
      <UICard className={styles.card}>
        {icon}
        {banner ? <span className={styles.banner}>{banner}</span> : null}
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

// 这部分内容后续从接口来
const activities = [
  {
    title: '最新活动',
    desc: '热门活动及产品特惠',
    href: 'https://marketing.qiniu.com/activity/all?entry=index-advert'
  },
  {
    title: '717 七牛品牌日',
    desc: 'CDN × 视频云，组合嗨购',
    href: 'https://marketing.qiniu.com/activity/717Brand-Festival?entry=index-advert',
    badge: '热门'
  },
  {
    title: '中小企业上云扶持',
    desc: '企业建站资源包限时 3 折',
    href: 'https://www.qiniu.com/events/enterpriseoncloud?entry=index-advert'
  },
  {
    title: 'SSL 证书年中采购季',
    desc: '全场 5 折起',
    href: 'https://marketing.qiniu.com/activity/activity-ssl?entry=index-advert'
  }
]

export default function Activities() {

  const cardsView = activities.slice(0, 4).map(({ title, desc, href, badge }, i) => {
    const Icon = icons[i]
    return (
      <Card
        key={i}
        icon={<Icon className={styles.icon} />}
        title={title}
        href={href}
        banner={badge}
      >
        {desc}
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
