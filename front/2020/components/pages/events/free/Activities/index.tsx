/**
 * @file 活动推荐
 */

import React, { CSSProperties } from 'react'
import { Row, LayoutCard } from 'components/UI/Card'
import Button from 'components/UI/Button'

import ImgGoglobal from './goglobal.png'
import style from './style.less'

export default function FreeActivities() {
  return (
    <Row>
      <Card
        title="出海企业扶持"
        desc="整合出海相关产品和服务资源，共同助力创业者占领全球市场"
        url="/products/kodo/goglobal"
        background={ImgGoglobal}
      />
      <Placeholder />
    </Row>
  )
}

type CardProps = {
  title: string
  desc: string
  url: string
  background: string
}

function Card({ title, desc, url, background }: CardProps) {
  const cardStyle: CSSProperties = {
    backgroundImage: `url(${background})`
  }
  return (
    <LayoutCard className={style.card} style={cardStyle}>
      <div className={style.cardContent}>
        <h1 className={style.cardTitle}>{title}</h1>
        <p className={style.cardDesc}>{desc}</p>
        <div className={style.cardOpLine}>
          <Button className={style.cardBtn} type="primary" href={url}>立即申请</Button>
        </div>
      </div>
    </LayoutCard>
  )
}

function Placeholder() {
  return (
    <LayoutCard className={style.placeholder}>
      <p className={style.placeholderWord}>更多活动，敬请期待</p>
    </LayoutCard>
  )
}
