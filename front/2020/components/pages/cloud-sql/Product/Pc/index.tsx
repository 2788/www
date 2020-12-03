import React from 'react'
import Feature from 'components/Product/Feature'
import Button from 'components/UI/Button'
import { Card, Row } from 'components/UI/Card'

import { CardProps, ProductProps } from '../index'
import style from './index.less'

export default function ForPc({ title = '产品简介', header = title, data }: ProductProps) {
  return (
    <Feature title={title} header={header} name="product">
      {
        data.map((product, index) => (
          <Row key={index}>
            {
              product.map((item, i) => <MyCard {...item} key={i} />)
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
