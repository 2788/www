import React from 'react'
import QRCode from 'qrcode.react'

import { useMobile } from 'hooks/ua'
import { process as processImg, scaleBy, withFormat } from 'utils/img'
import { Card as UICard, Img, Content, Title, Desc } from 'components/UI/Card'
import Section from 'components/pages/index/Section'
import Link from 'components/Link'
import ArrowLink from 'components/Product/Section/ArrowLink'

import { NewsType } from 'apis/admin/homepage'

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

function Story({ banner, title, summary, createTime, link }: NewsType) {

  const imgUrl = processImg(banner, scaleBy({ width: 500 }), withFormat('jpg'))

  return (
    <UICard className={styles.story}>
      <Link href={link}>
        <Img className={styles.img} src={imgUrl} />
        <Content className={styles.content}>
          <Title className={styles.title}>{title}</Title>
          <Desc className={styles.desc}>{summary}</Desc>
          <div className={styles.footer}>
            <span className={styles.date}>{createTime}</span>
            <Social wxUrl={link} />
          </div>
        </Content>
      </Link>
    </UICard>
  )
}

export default function News({ news }: { news: NewsType[] }) {
  const isMobile = useMobile()
  return (
    <Section grey className={styles.news} title="七牛资讯" subtitle="七牛热点资讯、前瞻技术，从 IT 到 DT 的时代，让我们连接数据，重塑价值!">
      {isMobile && <div className={styles.splitLine} />}
      <div className={styles.page}>
        {
          news.map((item, i) => (
            <Story {...item} key={i} />
          ))
        }
      </div>
      <ArrowLink href="https://blog.qiniu.com/archives/all">
        更多资讯
      </ArrowLink>
    </Section>
  )
}
