import React from 'react'
import Feature from 'components/Product/Feature'
import Button from 'components/UI/Button'
import { Card, Row, InvisibleCard } from 'components/UI/Card'

import { CardProps, ProductProps } from '../index'
import style from './index.less'

export default function ForPc({ data }: ProductProps) {
  return (
    <Feature title="产品简介" header="丰富的云数据库产品" name="product">
      {
        data.map((product, index) => (
          <Row key={index}>
            {
              product.map((item, i) => {
                // 占位，空白卡片
                if (!item) {
                  return <InvisibleCard className={style.cardWrapper} key={`${index}-${i}`} />
                }
                return (
                  <MyCard {...item} key={`${index}-${i}`} />
                )
              })
            }
          </Row>
        ))
      }
    </Feature>
  )
}

function MyCard({ title, icon, desc, href }: CardProps) {
  return (
    <Card className={style.cardWrapper}>
      {icon}
      <div className={style.cardTitle}>{title}</div>
      <div className={style.cardDesc}>{desc}</div>
      <Button href={href} className={style.cardBtn} type="hollow" withBorder>了解更多</Button>
    </Card>
  )
}
