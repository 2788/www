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

export default function Activities() {
  return (
    <div className={styles.activities}>
      <div className={styles.content}>
        <Card
          icon={<Activity1Icon className={styles.icon} />}
          title="最新活动"
          href="https://marketing.qiniu.com/activity/all?entry=index-advert"
        >
          热门活动及产品特惠
        </Card>
        <Card
          icon={<Activity2Icon className={styles.icon} />}
          title="中小企业上云扶持"
          href="https://www.qiniu.com/events/enterpriseoncloud?entry=index-advert"
          banner="热门"
        >
          企业建站资源包限时 3 折
        </Card>
        <Card
          icon={<Activity3Icon className={styles.icon} />}
          title="SSL 证书年中采购季"
          href="https://marketing.qiniu.com/activity/activity-ssl?entry=index-advert"
        >
          全场 5 折起
        </Card>
        <Card
          icon={<Activity4Icon className={styles.icon} />}
          title="人脸核验，特惠来袭"
          href="https://marketing.qiniu.com/activity/activity-faceid?entry=index-advert"
        >
          爆款服务，限时抢购
        </Card>
      </div>
    </div>
  )
}
