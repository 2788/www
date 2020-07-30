/**
 * @file cdn 页热销套餐 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import Button from 'components/UI/Button'
import Section from 'components/Product/Section'

import CheckedIcon from './checked.svg'
import style from './index.less'

export default function Packages() {
  return (
    <Section name="packages" title="热销套餐" grey>
      <Card
        title="日间包特惠"
        desc="适合业务主要在日间的门户网站和教育类客户"
        category="国内静态加速流量"
        capacity="500 GB"
        categoryDesc="一次性发放，一年有效"
        price="75.00"
        detailLink="https://qmall.qiniu.com/template/MTY?spec_combo=NjA3&ref=qcdn"
        sellPoints={['适用时段：9:00 - 18:00', '类型：HTTP']}
      />
      <Card
        title="入门型"
        desc="适合日下行流量小于 1500 MB 的小型网站"
        category="国内静态加速流量"
        capacity="500 GB"
        categoryDesc="一次性发放，一年有效"
        price="98.00"
        detailLink="https://qmall.qiniu.com/template/MTY?spec_combo=NTgz&ref=qcdn"
        sellPoints={['适用时段：全时段可用', '类型：HTTP']}
      />
      <Card
        title="进阶型"
        desc="适合日下行流量小于 3 GB 的中型网站"
        category="国内静态加速流量"
        capacity="1 TB"
        categoryDesc="一次性发放，一年有效"
        price="193.00"
        detailLink="https://qmall.qiniu.com/template/MTY?spec_combo=NTg2&ref=qcdn"
        sellPoints={['适用时段：全时段可用', '类型：HTTP']}
      />
      <Card
        title="专业型"
        desc="适合日下行流量小于 15 GB 的大型网站"
        category="国内静态加速流量"
        capacity="5 TB"
        categoryDesc="一次性发放，一年有效"
        price="942.00"
        detailLink="https://qmall.qiniu.com/template/MTY?spec_combo=NTg5&ref=qcdn"
        sellPoints={['适用时段：全时段可用', '类型：HTTP']}
      />
    </Section>
  )
}

type CardProps = {
  title: string
  desc: string
  category: string
  capacity: string
  categoryDesc: string
  unit: string
  sellPoints: string[]
  price: string
  detailLink: string
}

Card.defaultProps = {
  unit: '元/年'
}

function Card(props: CardProps) {
  const { title, desc, category, capacity, categoryDesc, sellPoints, price, unit, detailLink } = props
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
      </div>
      <div className={style.body}>
        <div className={style.row}>
          <h5 className={style.category}>
            {category}
            <span className={style.capacity}>{capacity}</span>
          </h5>
          <p className={style.categoryDesc}>{categoryDesc}</p>
        </div>
        {sellPointItems}
      </div>
      <div className={style.footer}>
        <p className={style.price}>
          <span className={style.number}>{price}</span>
          <span>{unit}</span>
        </p>
        <Button className={style.button} href={detailLink} type="hollow" withBorder>
          立即购买
        </Button>
      </div>
    </div>
  )
}
