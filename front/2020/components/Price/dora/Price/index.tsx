import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'

import PriceDetail from './Detail'
import style from './index.less'

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="计费方式" className={style.mode}>
        <p className={style.text}>
          智能多媒体服务是一款后付费产品，每月 3～5 日生成上个月的账单并进行结算。
          音视频转码按分钟收费。部分图片处理按图片原文件的大小计算数据的处理量进行计量，按量付费，每月提供一定量免费处理量。
          部分数据处理按调用次数收费。
        </p>
        <p className={style.text} style={{ margin: '16px 0' }}>开通七牛云智能多媒体服务的标准用户，每月可享受一定量的免费额度。每月计费时，会先抵扣免费额度，超出部分按价格详情付费结算。</p>
        <Card title="每月多媒体处理服务" num="20" unit="元" />
        <Card title="标准存储每月免费 CDN 回源流量" num="20" unit="TB" />
        <Card title="每月 C1M1 自定义数据处理服务" num="750" unit="小时" />
      </PricePaneSection>
      <PricePaneSection title="价格详情">
        <PriceDetail />
      </PricePaneSection>
    </PricePane>
  )
}

type CardProps = {
  title: string
  num: string
  unit: string
}

function Card(props: CardProps) {
  const { title, num, unit } = props

  return (
    <div className={style.card}>
      <p className={style.title}>{title}</p>
      <p><span className={style.num}>{num}</span><span className={style.unit}>{unit}</span></p>
    </div>
  )
}
