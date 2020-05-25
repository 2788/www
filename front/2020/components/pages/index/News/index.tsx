import React, { ReactNode } from 'react'
import Carousel from 'react-icecream/lib/carousel'

import { Card as UICard, Img, Content, Title, Desc } from 'components/UI/Card'
import Section from 'components/Product/Section'

import { news } from './news'

import styles from './style.less'

export interface StoryProps {
  imgUrl: string
  title: string
  desc: string
  date: string
  link: string
  source?: ReactNode
}

function Story({ imgUrl, title, desc, date, link, source }: StoryProps) {
  return (
    <UICard className={styles.story}>
      <a href={link}>
        <Img className={styles.img} src={imgUrl} />
        <Content className={styles.content}>
          <Title className={styles.title}>{title}</Title>
          <Desc className={styles.desc}>{desc}</Desc>
          <div className={styles.footer}>
            <span className={styles.date}>{date}</span>
            {source}
          </div>
        </Content>
      </a>
    </UICard>
  )
}

interface PageProps {
  list: StoryProps[]
}

function Page({ list }: PageProps) {
  return (
    <div className={styles.page}>
      {
        list.map((item, idx) => (
          <Story key={idx} {...item} />
        ))
      }
    </div>
  )
}

export default function News() {
  const pages = getPagesFromNews(news)
  return (
    <Section className={styles.news} grey title="七牛资讯" name="news" subtitle="七牛热点资讯、前瞻技术，从 IT 到 DT的时代，让我们连接数据，重塑价值!">
      <Carousel>
        {
          pages.map((page, idx) => (
            <Page key={idx} list={page} />
          ))
        }
      </Carousel>
    </Section>
  )
}

function getPagesFromNews(newsList: StoryProps[]) {
  const pages = []
  while (newsList && newsList.length > 0) {
    pages.push(newsList.splice(0, 4))
  }
  return pages
}
