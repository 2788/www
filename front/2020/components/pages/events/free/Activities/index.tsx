/**
 * @file 活动推荐
 */

import React, { CSSProperties } from 'react'
import { Row, LayoutCard } from 'components/UI/Card'
import Button from 'components/UI/Button'
import { process, scaleBy, withFormat } from 'utils/img'

import ImgGoglobal from './goglobal.png'
import Qvm0buy from './qvm0buy.png'
import style from './style.less'

export default function FreeActivities() {
  return (
    <Row>
      <Card
        title="新推官火热招募中"
        desc="推广简单易上手，权益返现新升级"
        url="/cps"
        background={ImgGoglobal}
        btnText="立即申请"
      />
      <Card
        title="云主机 0 元购"
        desc="计算产品免费试用，祝您轻松上云 / 迁移"
        url="/events/qvm0rmb"
        background={Qvm0buy}
        btnText="立即参与"
      />
    </Row>
  )
}

type CardProps = {
  title: string
  desc: string
  url: string
  btnText: string
  background: string
}

function Card({ title, desc, url, background, btnText }: CardProps) {
  const cardStyle: CSSProperties = {
    backgroundImage: `url(${process(background, scaleBy({ width: 576 }), withFormat('jpg'))})`
  }
  return (
    <LayoutCard className={style.card} style={cardStyle}>
      <div className={style.cardContent}>
        <h1 className={style.cardTitle}>{title}</h1>
        <p className={style.cardDesc}>{desc}</p>
        <div className={style.cardOpLine}>
          <Button className={style.cardBtn} type="primary" href={url}>{btnText}</Button>
        </div>
      </div>
    </LayoutCard>
  )
}

// function Placeholder() {
//   return (
//     <LayoutCard className={style.placeholder}>
//       <p className={style.placeholderWord}>更多活动，敬请期待</p>
//     </LayoutCard>
//   )
// }
