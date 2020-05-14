/**
 * @file 入门版机型卡片
 */

import React from 'react'
import { Card } from 'components/UI/Card'
import Button from 'components/UI/Button'
import { urlForQvmBuy } from 'utils/route'

import IconInstance from './instance.svg'
import IconBandwidth from './bandwidth.svg'
import IconStorage from './storage.svg'
import IconOK from '../hook.svg'
import style from './style.less'

export type Props = {
  instanceType: string // 机型
  name: string // 机型名
  features: string[] // 特点，机型下方展示
  instance: string // 实例
  storage: number // 存储空间（高效云盘），单位 G
  bandwidth: number // 带宽，单位 M
  price: number // 价格，单位 元/月
}

export default function PrimaryCard({
  instanceType,
  name,
  features,
  instance,
  storage,
  bandwidth,
  price
}: Props) {

  const featuresView = features.map(
    (feature, i) => (
      <li key={i} className={style.feature}>
        <IconOK className={style.icon} />
        {feature}
      </li>
    )
  )

  const priceText = price.toFixed(2)

  const buyUrl = urlForQvmBuy({
    instance_type: instanceType,
    eip: bandwidth,
    buymonth: 12
  })

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
            <IconStorage className={style.icon} />高效云盘：{storage} GB
          </li>
          <li className={style.param}>
            <IconBandwidth className={style.icon} />带宽：{bandwidth} M
          </li>
        </ul>
      </div>
      <footer className={style.footer}>
        <p className={style.price}>
          {priceText}
          <span className={style.unit}>元/月</span>
        </p>
        <Button className={style.buyBtn} withBorder target="_blank" href={buyUrl}>立即购买</Button>
      </footer>
    </Card>
  )
}
