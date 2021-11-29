import React, { ReactNode } from 'react'

import Section from 'components/Product/Section'
import { Row, Card, Desc } from 'components/UI/Card'
import { Button } from 'components/OperationCard'

import { useMobile } from 'hooks/ua'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import zhao from './images/zhao.png'
import wang from './images/wang.png'
import zhang from './images/zhang.png'
import iconQrCode from './images/icon-qrcode.png'

import style from './index.less'

const cases = [{
  desc: '我是做技术服务的，平时抽空帮七牛做做推广，大概只花了一个多月，我的收入就突破了万元，感谢七牛！',
  icon: <Icon1 />,
  avatar: <img src={zhao} alt="赵先生" />,
  name: '赵先生',
  job: '产品经理'
}, {
  desc: '七牛云的技术服务口碑不错，产品功能也操作方便，上云比较简单。我介绍完七牛的产品优势，很多客户都愿意来七牛下单。',
  icon: <Icon2 />,
  avatar: <img src={wang} alt="王先生" />,
  name: '王先生',
  job: '推广专员'
}, {
  desc: '云计算是国家的新基建，我相信会有越来越多的企业需要上云，数字化社会会很快到来。帮助企业上云的同时，自己也能赚到钱，何乐不为呢？',
  icon: <Icon3 />,
  avatar: <img src={zhang} alt="张先生" />,
  name: '张先生',
  job: '技术总监'
}]

export default function Cases() {
  return (
    <Section
      name="cases"
      title="推广案例"
      subtitle="加入我们，和推广大神们一起分享推广经验"
    >
      <Row>
        {
          cases.map((item, index) => (
            <MyCard
              key={`cps-cases-${index}`}
              {...item}
            />
          ))
        }
        <QrCodeCard />
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

      <Desc className={style.desc}>
        {desc}
      </Desc>

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

function QrCodeCard() {
  const isMobile = useMobile()
  const qrCodeIconView = (
    <img
      className={style.iconQrCode}
      src={iconQrCode}
      title="通过 QQ 扫一扫二维码，加入群聊了解更多"
      alt="通过 QQ 扫一扫二维码，加入群聊了解更多"
    />
  )
  const mobileJoinBtn = (
    <Button
      className={style.btn}
      href="https://jq.qq.com/?_wv=1027&k=f7BABHHj"
      target="_blank"
    >
      加入群聊
    </Button>
  )

  return (
    <Card className={style.qrCodeCard}>
      <div className={style.title}>
        新推官交流群
      </div>

      <Desc className={style.desc}>
        加入了解更多推广方法、交流学习、问题探讨、最新活动
      </Desc>

      <div className={style.iconQrCodeWrapper}>
        {isMobile ? mobileJoinBtn : qrCodeIconView}
      </div>

      <footer className={style.bottom}>
        <h4>QQ 群号：1106335666{isMobile ? null : <>，通过 QQ 扫一扫二维码</>}</h4>
      </footer>
    </Card>
  )
}
