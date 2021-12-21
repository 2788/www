import React from 'react'
import cls from 'classnames'
import { chunk } from 'lodash'
import Link from 'components/Link'
import { LayoutCard } from 'components/UI/Card'
import { cardData, CardProps, defaultBgStyle } from '../constants'
import style from './style.less'

export default function Pc() {
  return (
    <div className={style.wrapper}>
      {
        chunk(cardData, 4).map((group, i) => (
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

function Card({ url, title, desc, iconUrl, backgroundImgUrl, cases }: CardProps) {
  return (
    <LayoutCard className={style.card}>
      <Link href={url || '#'} className={style.link}>
        <div className={style.bgImg} style={{ ...defaultBgStyle, backgroundImage: `url(${backgroundImgUrl})` }} />
        <div className={style.overlay} ></div>
        <div className={style.contentWrapper}>
          <div className={style.content}>
            <img className={style.icon} src={iconUrl} />
            <h3 className={style.title}>{title}</h3>
            <p className={style.desc}>{desc}</p>
            <div className={style.cases}>
              {
                [...cases, null, null, null].slice(0, 3).map((caseUrl, index) => (
                  caseUrl !== null
                    ? (
                      <div className={style.case} key={index}>
                        <img src={caseUrl} />
                      </div>
                    )
                    : <div className={cls(style.case, style.invisible)} key={index} />
                ))
              }
            </div>
          </div>
        </div>
      </Link>
    </LayoutCard>
  )
}
