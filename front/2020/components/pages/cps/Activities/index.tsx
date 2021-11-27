import React, { ReactNode } from 'react'
import {
  Card as UICard,
  Title,
  Desc
} from 'components/UI/Card'

import Rebate from './images/rebate.svg'
import Cloud from './images/cloud.svg'
import Relation from './images/relation.svg'

import style from './style.less'

const activities = [{
  title: '返佣比例超高',
  desc: '订单返现高达 30%，等级越高，返现越多',
  icon: <Rebate />
}, {
  title: '众多爆款云产品',
  desc: '海量预付费产品均可返现，推广收入一目了然',
  icon: <Cloud />
}, {
  title: '30 天关联期',
  desc: '新客注册成功即建立 30 天关联',
  icon: <Relation />
}]

export default function Activities() {
  return (
    <div className={style.content}>
      {
        activities.map((activity, index) => (
          <Card
            key={index}
            {...activity}
          />
        ))
      }
    </div>
  )
}

interface CardProps {
  title: string
  desc: string
  icon: ReactNode
}

function Card({ icon, title, desc }: CardProps) {
  return (
    <UICard className={style.card}>
      {icon}
      <div className={style.cardContent}>
        <Title className={style.title}>
          {title}
        </Title>
        <Desc className={style.desc}>
          {desc}
        </Desc>
      </div>
    </UICard>
  )
}
