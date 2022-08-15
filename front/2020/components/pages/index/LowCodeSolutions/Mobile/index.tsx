import React from 'react'
import { partition } from 'lodash'
import { LayoutCard, Row } from 'components/UI/Card'
import Link from 'components/Link'

import { cardData, CardProps } from '../constants'
import Arrow from '../images/arrow.svg'
import style from './style.less'

export default function Mobile() {
  const [itemsWithUrl, itemsWithoutUrl] = partition(cardData, item => item.url != null)
  return (
    <div className={style.wrapper}>
      <Row className={style.row}>
        {[...itemsWithUrl, ...itemsWithoutUrl].map((item, i) => <Card key={i} {...item} />)}
      </Row>
    </div>
  )
}

function Card({ url, title, desc, backgroundImgUrl }: CardProps) {
  const children = (
    <>
      <LayoutCard className={style.card} style={{ backgroundImage: `url("${backgroundImgUrl}")` }}>
        <div className={style.mask} />
        <div className={style.title}>{title}{url != null && <Arrow className={style.icon} />}</div>
        <div className={style.desc}>{desc}</div>
      </LayoutCard>
    </>
  )
  if (url != null) {
    return (
      <Link href={url} className={style.link}>
        {children}
      </Link>
    )
  }
  return (
    <div className={style.link}>
      {children}
    </div>
  )
}
