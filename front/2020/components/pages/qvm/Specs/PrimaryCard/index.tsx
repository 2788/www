/**
 * @file 入门版机型卡片
 */

import React from 'react'
import { Card } from 'components/UI/Card'
import Button from 'components/UI/Button'

import IconInstance from './instance.svg'
import IconBandwidth from './bandwidth.svg'
import IconStorage from './storage.svg'
import IconOK from './storage.svg' // TODO: 勾没有切图
import style from './style.less'

export type Props = {
  name: string // 机型名
  features: string[] // 特点，机型下方展示
  instance: string // 实例
  storage: string // 存储空间
  bandwidth: string // 带宽
  price: number // 价格，单位元/月
  href: string // 购买链接
}

export default function PrimaryCard({ name, features, instance, storage, bandwidth, price, href }: Props) {

  const featuresView = features.map(
    (feature, i) => (
      <li key={i} className={style.feature}>
        <IconOK className={style.icon} />
        {feature}
      </li>
    )
  )

  const priceText = price.toFixed(1)

  return (
    <Card className={style.wrapper}>
      <header className={style.header}>
        <h4 className={style.title}>{name}</h4>
        <ul className={style.features}>
          {featuresView}
        </ul>
      </header>
      <div className={style.body}>
        <ul className={style.params}>
          <li className={style.param}>
            <IconInstance className={style.icon} />实例：{instance}
          </li>
          <li className={style.param}>
            <IconStorage className={style.icon} />高效云盘：{storage}
          </li>
          <li className={style.param}>
            <IconBandwidth className={style.icon} />带宽：{bandwidth}
          </li>
        </ul>
      </div>
      <footer className={style.footer}>
        <p className={style.price}>
          {priceText}
          <span className={style.unit}>元/月</span>
        </p>
        <Button className={style.buyBtn} withBorder href={href}>立即购买</Button>
      </footer>
    </Card>
  )
}
