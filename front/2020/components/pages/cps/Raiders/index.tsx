import React, { ReactNode } from 'react'

import Section from 'components/Product/Section'
import Card, { Title, Desc, Button } from 'components/OperationCard'
import { Row } from 'components/UI/Card'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'

import style from './index.less'

const cards = [{
  title: '新客福利推广',
  desc: 'TODO',
  icon: <Icon1 />,
  href: 'https://portal.qiniu.com/invitation'
}, {
  title: '热门活动推广',
  desc: '近期热门活动、爆款产品一网打尽，助力推广下单。',
  icon: <Icon2 />,
  href: 'https://portal.qiniu.com/invitation'
}, {
  title: '自定义推广链接',
  desc: '自定义专属推广链接，灵活方便。',
  icon: <Icon3 />,
  href: 'https://portal.qiniu.com/invitation'
}]

export default function Raiders() {
  return (
    <Section
      name="raiders"
      title="推广素材"
      subtitle="多种推广方式助力新推官快速获客"
    >
      <Row>
        {
          cards.map((item, index) => (
            <MyCard
              key={`cps-raiders-${index}`}
              {...item}
            />
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
  href: string
}

export function MyCard({ title, desc, icon, href }: CardProps) {
  const footerView = <Button href={href} target="_blank">立即推广</Button>

  return (
    <Card
      className={style.card}
      header={null}
      footer={footerView}
    >
      {icon}

      <Title className={style.title}>
        {title}
      </Title>
      <Desc className={style.desc}>
        {desc}
      </Desc>
    </Card>
  )
}
