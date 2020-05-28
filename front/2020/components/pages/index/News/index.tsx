import React from 'react'
import QRCode from 'qrcode.react'
import Carousel from 'react-icecream/lib/carousel'

import { useMobile } from 'hooks/ua'
import { Card as UICard, Img, Content, Title, Desc } from 'components/UI/Card'
import Section from 'components/pages/index/Section'
import Link from 'components/Link'

import { news } from './news'

import styles from './style.less'

import WeiboIcon from './images/sina_weibo.svg'
import WechatIcon from './images/wechat.svg'

interface SocialProps {
  wxUrl: string
}

function Social({ wxUrl }: SocialProps) {
  return (
    <div className={styles.social}>
      <WechatIcon className={styles.wechat} />
      <div className={styles.tooltip}><QRCode size={90} value={wxUrl} /></div>
      <Link href="https://weibo.com/qiniutek">
        <WeiboIcon className={styles.weibo} />
      </Link>
    </div>
  )
}

export interface StoryProps {
  imgUrl: string
  title: string
  desc: string
  date: string
  link: string
  wxUrl: string
}

function Story({ imgUrl, title, desc, date, link, wxUrl }: StoryProps) {
  return (
    <UICard className={styles.story}>
      <Link href={link}>
        <Img className={styles.img} src={imgUrl} />
        <Content className={styles.content}>
          <Title className={styles.title}>{title}</Title>
          <Desc className={styles.desc}>{desc}</Desc>
          <div className={styles.footer}>
            <span className={styles.date}>{date}</span>
            <Social wxUrl={wxUrl} />
          </div>
        </Content>
      </Link>
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
  const isMobile = useMobile()
  return (
    <Section className={styles.news} grey title="七牛资讯" subtitle="七牛热点资讯、前瞻技术，从 IT 到 DT 的时代，让我们连接数据，重塑价值!">
      {isMobile && <div className={styles.splitLine} />}
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
  const pageSize = 4
  for (let i = 0; i < newsList.length; i += pageSize) {
    pages.push(newsList.slice(i, i + pageSize))
  }
  return pages
}
