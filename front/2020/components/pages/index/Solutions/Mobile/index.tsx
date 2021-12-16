import React from 'react'
import { chunk } from 'lodash'
import Link from 'components/Link'
import { LayoutCard } from 'components/UI/Card'
import { cardData, CardProps, defaultBgStyle } from '../constants'
import style from './style.less'

export default function Mobile() {
  return (
    <div className={style.wrapper}>
      {
        chunk(cardData, 2).map((group, i) => (
          <div className={style.row} key={i}>
            {
              group.map((item, index) => (
                <Card {...item} key={index} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

function Card({ url, title, iconUrl, backgroundImgUrl }: CardProps) {
  return (
    <LayoutCard className={style.card}>
      <Link href={url || '#'}>
        <div className={style.overlay} ></div>
        <div className={style.bgImg} style={{ ...defaultBgStyle, backgroundImage: `url(${backgroundImgUrl})` }} />
        <div className={style.content}>
          <img className={style.icon} src={iconUrl} />
          <h3 className={style.title}>{title}</h3>
        </div>
      </Link>
    </LayoutCard >
  )
}
