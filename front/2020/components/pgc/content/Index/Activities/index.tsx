/**
 * @file 内容站首页右侧广告位
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'

import Link from 'components/Link'
import { PgcHomePageActivity, AdvertInfo } from 'apis/thallo'
import { useTrack } from 'hooks/thallo'

import styles from './style.less'

function Item(props: AdvertInfo<PgcHomePageActivity>) {
  const { pPic, url } = props.elements

  const [link, setLink] = useState<HTMLElement | null>(null)
  useTrack(link, props)

  return (
    <Link ref={setLink} className={styles.item} href={url.value}>
      <img
        src={pPic.value}
        title={pPic.imgTitle}
        alt={pPic.imgAlt}
        style={{ backgroundColor: pPic.imgColorFill }}
      />
    </Link>
  )
}

export interface Props {
  activities: Array<AdvertInfo<PgcHomePageActivity>>
}

export default function Activities({ activities }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.title}>热门活动</div>
      <div className={styles.list}>
        {activities.map((activity, i) => (
          <Item key={i} {...activity} />
        ))}
      </div>
    </div>
  )
}
