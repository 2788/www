import React, { useState } from 'react'
import cls from 'classnames'

import {
  Card as UICard, Title, Desc, Content
} from 'components/UI/Card'
import Link from 'components/Link'
import { HomePageActivity, AdvertInfo } from 'apis/thallo'
import { useTrack } from 'hooks/thallo'
import { useMobile } from 'hooks/ua'

import styles from './style.less'

function Card(props: AdvertInfo<HomePageActivity>) {
  const { icon, txt, subTxt, url, cornerTxt } = props.elements
  const banner = cornerTxt.value.trim().toUpperCase()

  const [link, setLink] = useState<HTMLElement | null>(null)
  useTrack(link, props)

  return (
    <Link ref={setLink} className={styles.container} href={url.value}>
      <UICard className={styles.card}>
        <div className={styles.icon} style={{ backgroundImage: `url("${icon.value}")` }} />
        {banner ? <div className={styles.banner} style={{ background: '#FA8C16' }}>{banner}</div> : null}
        <Content className={styles.cardContent}>
          <Title className={styles.title}>{txt.value}</Title>
          <Desc className={styles.desc}>{subTxt.value}</Desc>
        </Content>
      </UICard>
    </Link>
  )
}

function MobileCard(props: AdvertInfo<HomePageActivity>) {
  const { url, icon, txt } = props.elements
  const [link, setLink] = useState<HTMLElement | null>(null)
  useTrack(link, props)
  return (
    <Link ref={setLink} href={url.value} className={styles.mobileCard}>
      <div className={styles.icon} style={{ backgroundImage: `url("${icon.value}")` }} />
      <div className={styles.title}>{txt.value}</div>
    </Link>
  )
}

export interface Props {
  activities: Array<AdvertInfo<HomePageActivity>>
  hide?: boolean
}

export default function Activities({ activities, hide = false }: Props) {
  const isMobile = useMobile()
  const Child = isMobile ? MobileCard : Card

  if (activities.length === 0) {
    return null
  }

  return (
    <div className={cls(styles.activities, hide ? styles.hide : styles.animated)}>
      <div className={styles.content}>
        {activities.map((activity, i) => (
          <Child key={i} {...activity} />
        ))}
      </div>
    </div>
  )
}
