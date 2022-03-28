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
import { Row } from 'components/UI/Card'

import CheckedIcon from './checked.svg'
import style from './index.less'

export default function StorageType() {
  const priceUrl = urlForPrice(Product.Kodo)
  return (
    <Section name="storage_type" title="存储类型">
      <Row>
        <Card
          title="标准存储"
          desc="高可靠、高可用和高性能的对象存储服务"
          scene="设计应用、内容分享、热点对象"
          price="0.098"
          detailLink={priceUrl}
          sellPoints={['设计可靠性：99.999999999%（11 个 9）', '数据访问：实时访问', '最短存储时间：无', 'Object 最小计量：无', '数据取回费用：无']}
        />
        <Card
          title="低频访问存储"
          desc="高可靠、高可用和较低成本的实时访问存储服务"
          scene="网盘应用、政企数据备份、监控"
          price="0.06"
          detailLink={priceUrl}
          sellPoints={['设计可靠性：99.999999999%（11 个 9）', '数据访问：实时访问', '最短存储时间：30 天', 'Object 最小计量：64 KB', '数据取回费用：按实际获取的数据量计费']}
        />
        <Card
          title="归档存储"
          desc="低成本的高可靠归档数据存储服务"
          scene="档案数据、医疗影像、科学资料"
          price="0.028"
          detailLink={priceUrl}
          sellPoints={['设计可靠性：99.999999999%（11 个 9）', '数据访问：\n先解冻再访问（1 ~ 5 分钟）', '最短存储时间：60 天', 'Object 最小计量：64 KB', '数据取回费用：按实际解冻的数据量计费']}
        />

        <Card
          title="深度归档存储"
          desc="单价最低的高可靠深度归档数据存储服务"
          scene="合规数据冷归档、媒体资源超长留存"
          price="0.012"
          detailLink={priceUrl}
          sellPoints={['设计可靠性：99.999999999%（11 个 9）', '数据访问：\n先解冻再访问（5 ～ 12 小时）', '最短存储时间：180 天', 'Object 最小计量：64 KB', '数据取回费用：按实际解冻的数据量计费']}
        />
      </Row>
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
          <span>元/GB/月</span>
        </p>
        <Button type="hollow" className={style.button} href={detailLink} withBorder>
          了解详情
        </Button>
      </div>
    </div>
  )
}
