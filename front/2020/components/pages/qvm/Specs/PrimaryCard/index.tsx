/**
 * @file 入门版机型卡片
 */

import React from 'react'
import Card, { Title, List, Item, HookItem, Button } from 'components/OperationCard'
import { urlForQvmBuy } from 'utils/route'

import IconInstance from './instance.svg'
import IconBandwidth from './bandwidth.svg'
import IconStorage from './storage.svg'
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
      <HookItem key={i} className={style.feature}>{feature}</HookItem>
    )
  )

  const priceText = price.toFixed(2)

  const buyUrl = urlForQvmBuy({
    instance_type: instanceType,
    eip: bandwidth,
    buymonth: 12
  })

  const headerView = (
    <>
      <Title>{name}</Title>
      <List className={style.features}>{featuresView}</List>
    </>
  )

  const footerView = (
    <>
      <p className={style.price}>
        {priceText}
        <span className={style.unit}>元/月</span>
      </p>
      <Button className={style.buyBtn} target="_blank" href={buyUrl}>立即购买</Button>
    </>
  )

  return (
    <Card header={headerView} footer={footerView}>
      <div className={style.body}>
        <List>
          <Item icon={<IconInstance />}>实例：{instance}</Item>
          <Item icon={<IconStorage />}>高效云盘：{storage} GB</Item>
          <Item icon={<IconBandwidth />}>带宽：{bandwidth} M</Item>
        </List>
      </div>
    </Card>
  )
}
