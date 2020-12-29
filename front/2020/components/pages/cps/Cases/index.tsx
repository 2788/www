import React, { ReactNode } from 'react'
import Section from 'components/Product/Section'
import { Row, Card, Desc } from 'components/UI/Card'

import { useMobile } from 'hooks/ua'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import zhao from './images/zhao.png'
import wang from './images/wang.png'
import zhang from './images/zhang.png'

import style from './index.less'

const cases = [
  {
    desc: '我是做技术服务的，平时抽空帮七牛做做推广，大概只花了一个多月，我的收入就突破了万元，感谢七牛！',
    icon: <Icon1 />,
    avatar: <img src={zhao} alt="赵先生" />,
    name: '赵先生',
    job: '产品经理'
  },
  {
    desc: '七牛云的技术服务口碑不错，产品功能也操作方便，上云比较简单。我介绍完七牛的产品优势，很多客户都愿意来七牛下单。',
    icon: <Icon2 />,
    avatar: <img src={wang} alt="王先生" />,
    name: '王先生',
    job: '推广专员'
  },
  {
    desc: '云计算是国家的新基建，我相信会有越来越多的企业需要上云，数字化社会会很快到来。帮助企业上云的同时，自己也能赚到钱，何乐不为呢？',
    icon: <Icon3 />,
    avatar: <img src={zhang} alt="张先生" />,
    name: '张先生',
    job: '技术总监'
  }
]
export default function Cases() {
  return (
    <Section name="cases" title="优秀推广案例">
      <Row>
        {
          cases.map((item, index) => (
            <MyCard {...item} key={index} />
          ))
        }
      </Row>
    </Section>
  )
}

type CardProps = {
  desc: string
  icon: ReactNode
  avatar: ReactNode // 头像
  name: string
  job: string
}

export function MyCard({ desc, icon, avatar, name, job }: CardProps) {
  const isMobile = useMobile()
  return (
    <Card className={style.card}>
      {!isMobile ? icon : null}
      <Desc className={style.desc}>{desc}</Desc>
      <footer className={style.footer}>
        {avatar}
        <div className={style.footerContent}>
          <h4>{name}</h4>
          <h5>{job}</h5>
        </div>
      </footer>
    </Card>
  )
}