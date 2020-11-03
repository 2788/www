import React, { ReactNode } from 'react'
import Section from 'components/Product/Section'
import Card, { Title, Desc, Button } from 'components/OperationCard'
import { Row } from 'components/UI/Card'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import style from './index.less'

const cards = [
  {
    title: '热门活动推广',
    desc: '近期热门活动、爆款产品一网打尽，助力推广下单。',
    icon: <Icon1 />,
    href: 'https://portal.qiniu.com/invitation'
  },
  {
    title: '自定义推广链接',
    desc: '自定义专属推广链接，灵活方便。',
    icon: <Icon2 />,
    href: 'https://portal.qiniu.com/invitation'
  },
  {
    title: '多渠道推广',
    desc: '一键分享至各大社交平台，也可下载推广图库，分享至自建网站。',
    icon: <Icon3 />
  }
]
export default function Raiders() {
  return (
    <Section name="raiders" title="推广攻略">
      <Row>
        {
          cards.map((item, index) => (
            <MyCard {...item} key={index} />
          ))
        }
      </Row>
    </Section>
  )
}

type CardProps = {
  title: string
  desc: string
  icon: ReactNode
  href?: string
}

export function MyCard({ title, desc, icon, href }: CardProps) {
  const footerView = href ? <Button target="_blank" href={href}>立即推广</Button> : <Button disabled>即将上线</Button>
  return (
    <Card header={null} footer={footerView} className={style.card}>
      {icon}
      <Title className={style.title}>{title}</Title>
      <Desc className={style.desc}>{desc}</Desc>
    </Card>
  )
}
