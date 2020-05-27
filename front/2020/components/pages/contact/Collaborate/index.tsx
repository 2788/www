import React, { ReactNode } from 'react'
import Section from 'components/Product/Section'
import { Row, Card } from 'components/UI/Card'

import MessageIcon from './images/message.svg'
import PhoneIcon from './images/phone.svg'
import PaperIcon from './images/paper.svg'
import PoliceIcon from './images/police.svg'

import style from './index.less'

export default function Collaborate() {
  return (
    <Section name="collaborate" title="服务与合作">
      <Row>
        <Card className={style.card}>
          <CardIcon><MessageIcon /></CardIcon>
          <CardTitle title="售前服务" subtitle="提供云服务产品咨询服务" />
          <CardItem title="电子邮箱" link="mailto:sales@qiniu.com">sales@qiniu.com</CardItem>
          <CardItem title="联系电话" link="tel:400-808-9176">400-808-9176 转 1</CardItem>
        </Card>
        <Card className={style.card}>
          <CardIcon><PhoneIcon /></CardIcon>
          <CardTitle title="售后服务" subtitle="提供 7*24 小时技术支持服务" />
          <CardItem title="工单系统" link="https://support.qiniu.com/tickets/category?ref=www.qiniu.com">访问工单系统</CardItem>
          <CardItem title="联系电话" link="tel:400-808-9176">400-808-9176 转 2</CardItem>
        </Card>
        <Card className={style.card}>
          <CardIcon><PaperIcon /></CardIcon>
          <CardTitle title="市场合作" subtitle="提供企业和客户合作往来服务" />
          <CardItem title="电子邮箱" link="mailto:marketing@qiniu.com">marketing@qiniu.com</CardItem>
          <CardItem title="联系电话" link="tel:400-808-9176">400-808-9176 转 3</CardItem>
        </Card>
        <Card className={style.card}>
          <CardIcon><PoliceIcon /></CardIcon>
          <CardTitle title="违规内容举报" subtitle="欢迎举报不良内容" />
          <CardItem title="电子邮箱" link="mailto:jubao@qiniu.com">jubao@qiniu.com</CardItem>
        </Card>
      </Row>
    </Section>
  )
}

function CardIcon({ children }: { children: ReactNode }) {
  return (
    <div className={style.cardIcon}>{children}</div>
  )
}

function CardTitle({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className={style.cardTitle}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  )
}

function CardItem({ children, title, link }: { children: ReactNode, title: string, link: string }) {
  return (
    <div className={style.cardItem}>
      <p>{title}</p>
      <div className={style.link}><a href={link}>{children}</a></div>
    </div>
  )
}
