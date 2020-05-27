/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Wed May 06 2020
 * @file: 存储类型
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Button from 'components/UI/Button'
import Section from 'components/Product/Section'
import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'

import CheckedIcon from './checked.svg'
import style from './index.less'

export default function StorageType() {
  return (
    <Section name="storage" title="存储类型">
      <Card
        title="标准存储"
        desc="高可靠、高可用和高性能的对象存储服务"
        scene="设计应用、内容分享、热点对象"
        price="0.099"
        detailLink={urlForPrice(Product.Kodo)}
        sellPoints={['设计可靠性：99.999999999%(九个9)', '设计可用性：99.99%', '数据访问：实时访问', '最短存储时间：无', 'Object 最小计算：无']}
      />
      <Card
        title="低频访问存储"
        desc="高可靠、高可用和较低成本的实时访问存储服务"
        scene="网盘应用、政企数据备份、监控数据"
        price="0.06"
        detailLink="/prices/kodo"
        sellPoints={['设计可靠性：99.999999999%(九个9)', '设计可用性：99.99%', '数据访问：实时访问', '最短存储时间：30 天', 'Object 最小计算：64 KB']}
      />
      <Card
        title="归档存储"
        desc="极低成本的高可靠归档数据存储服务"
        scene="档案数据、医疗影像、科学资料"
        price="0.032"
        detailLink="/prices/kodo"
        sellPoints={['设计可靠性：99.999999999%(九个9)', '设计可用性：99.99%(数据解冻后)', '数据访问：先解冻再访问', '最短存储时间：无', 'Object 最小计算：无']}
      />
    </Section>
  )
}

type CardProps = {
  title: string
  desc: string
  scene: string
  sellPoints: string[]
  price: string
  detailLink: string
}

function Card(props: CardProps) {
  const { title, desc, scene, sellPoints, price, detailLink } = props
  const sellPointItems = sellPoints.map((sellPoint, index) => (
    <p key={index} className={style.row}>
      <CheckedIcon className={style.icon} />
      {sellPoint}
    </p>
  ))

  return (
    <div className={style.card}>
      <div className={style.header}>
        <div className={style.title}>{title}</div>
        <p className={style.desc}>{desc}</p>
        <p className={style.scene}>适用场景：{scene}</p>
      </div>
      <div className={style.body}>{sellPointItems}</div>
      <div className={style.footer}>
        <p className={style.price}>
          <span className={style.number}>{price}</span>
          <span>/GB/月</span>
        </p>
        <Button type="hollow" className={style.button} href={detailLink} withBorder>
          了解详情
        </Button>
      </div>
    </div>
  )
}
