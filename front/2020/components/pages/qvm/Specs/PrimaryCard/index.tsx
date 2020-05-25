/**
 * @file 入门版机型卡片
 */

import React from 'react'
import Card, { Title, List, Item, HookItem, Button } from 'components/OperationCard'

import IconInstance from './instance.svg'
import IconBandwidth from './bandwidth.svg'
import IconStorage from './storage.svg'
import style from './style.less'

export type Props = {
  name: string // family 名
  desc: string[] // 特点，机型下方展示
  instance: string // 实例信息
  storage: string // 存储空间（高效云盘）
  bandwidth: string // 带宽
  price: number // 价格，单位 元/月
  buyUrl: string // 购买地址
}

export default function PrimaryCard({ name, desc, instance, storage, bandwidth, price, buyUrl }: Props) {

  const descView = desc.map(
    (feature, i) => (
      <HookItem key={i} className={style.feature}>{feature}</HookItem>
    )
  )

  const priceText = price.toFixed(2)

  const headerView = (
    <>
      <Title>{name}</Title>
      <List className={style.desc}>{descView}</List>
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
          <Item icon={<IconInstance />}>{instance}</Item>
          <Item icon={<IconStorage />}>{storage}</Item>
          <Item icon={<IconBandwidth />}>{bandwidth}</Item>
        </List>
      </div>
    </Card>
  )
}
