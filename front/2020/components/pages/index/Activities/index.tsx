import React, { useState } from 'react'

import {
  Card as UICard, Title, Desc, Content
} from 'components/UI/Card'
import Link from 'components/Link'
import { HomePageActivity, AdvertInfo } from 'apis/thallo'
import { useTrack } from 'hooks/thallo'

import styles from './style.less'

function Card(props: AdvertInfo<HomePageActivity>) {
  const { icon, txt, subTxt, url, cornerTxt } = props.elements
  const banner = cornerTxt.value.trim().toUpperCase()

  const [link, setLink] = useState<HTMLElement | null>(null)
  useTrack(link, props)

  return (
    <Link ref={setLink} className={styles.container} href={url.value}>
      <UICard className={styles.card}>
        <div className={styles.icon} style={{ backgroundImage: `url(${icon.value})` }} />
        {banner ? <div className={styles.banner} style={{ background: '#FA8C16' }}>{banner}</div> : null}
        <Content className={styles.cardContent}>
          <Title className={styles.title}>{txt.value}</Title>
          <Desc className={styles.desc}>{subTxt.value}</Desc>
        </Content>
      </UICard>
    </Link>
  )
}

export interface Props {
  activities: Array<AdvertInfo<HomePageActivity>>
}

export default function Activities({ activities }: Props) {
  return (
    <div className={styles.activities}>
      <div className={styles.content}>
        {activities.map((activity, i) => (
          <Card key={i} {...activity} />
        ))}
      </div>
    </div>
  )
}
