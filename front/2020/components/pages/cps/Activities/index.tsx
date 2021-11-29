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
  title: '享受超高免税佣金',
  desc: '推荐好友上云最高可获 35% 返现奖励',
  icon: <Rebate />
}, {
  title: '众多爆款推广素材',
  desc: '多场景推广素材助力新推官轻松获客',
  icon: <Cloud />
}, {
  title: '推广返佣不限首单',
  desc: '30 天关联期间内受邀人购买订单均可返佣',
  icon: <Relation />
}]

export default function Activities() {
  return (
    <div className={style.content}>
      {
        activities.map((activity, index) => (
          <Card
            key={`cps-activities-${index}`}
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
