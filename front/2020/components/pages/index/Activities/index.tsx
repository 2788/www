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
        <Content className={styles.content}>
          <Title className={styles.title}>{title}</Title>
          <Desc className={styles.desc}>{children}</Desc>
        </Content>
      </UICard>
    </Link>
  )
}

export default function Activities() {
  return (
    <div className={styles.activities}>
      <Card
        icon={<Activity1Icon className={styles.icon} />}
        title="最新活动"
        href="https://marketing.qiniu.com/activity/all?entry=index-advert"
        banner="热门"
      >
        热门活动及产品特惠
      </Card>
      <Card
        icon={<Activity2Icon className={styles.icon} />}
        title="CDN 特惠 5 折"
        href="https://marketing.qiniu.com/activity/20200423?entry=index-advert"
      >
        日间包活动
      </Card>
      <Card
        icon={<Activity3Icon className={styles.icon} />}
        title="归档存储，重磅上线"
        href="/products/kodo?entry=index-advert"
      >
        安全持久 成本更低
      </Card>
      <Card
        icon={<Activity4Icon className={styles.icon} />}
        title="转码包，新春特惠"
        href="/events/dora-package?entry=index-advert"
      >
        超低价，优惠来袭
      </Card>
    </div>
  )
}
