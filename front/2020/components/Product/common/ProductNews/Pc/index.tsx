import React from 'react'
import Section from 'components/Product/Section'
import Link from 'components/Link'
import { Card, Desc, Title } from 'components/UI/Card'
import { INews } from 'apis/admin/product'
import { nameMap } from 'constants/products/news'

import styles from './style.less'
import { formatTime } from '..'

export default function ProductNews({ news, count, maxNum }: { news: INews[], count: number, maxNum: number }) {
  if (count <= 1) return null

  const itemsView = news.map((item, index) => (
    <div className={styles.item} key={index}>
      <header>
        <h4>{formatTime(item.releaseTime)}</h4>
        <p>{nameMap[item.type]}</p>
      </header>
      <div className={styles.icon}></div>
      <Card className={styles.card}>
        <Title className={styles.title}>{item.title}</Title>
        <Desc className={styles.desc}>{item.desc}</Desc>
        {item.link && <Link className={styles.detailLink} href={item.link} blue>查看详情 &gt;</Link>}
      </Card>
    </div>
  ))
  const linkView = count > maxNum && (
    <Link className={styles.link} href="/product-news" blue>查看全部动态 &gt;</Link>
  )

  return (
    <Section title="产品动态" name="product-news">
      <div className={styles.container}>
        {itemsView}
      </div>
      {linkView}
    </Section >
  )
}
