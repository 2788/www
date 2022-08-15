import React from 'react'
import { chunk } from 'lodash'
import { LayoutCard, Img as CardImg } from 'components/UI/Card'
import { cardData, logoUrls } from '../constants'
import MarkIcon from '../images/mark.svg'
import style from './style.less'

export default function Mobile() {
  return (
    <div className={style.wrapper}>
      <div className={style.cardsWrapper}>
        <div className={style.cards}>
          {
            cardData.map(({ iconUrl, desc, name }, index) => (
              <LayoutCard className={style.card} key={index}>
                <div className={style.imgWrapper}>
                  <CardImg src={iconUrl} className={style.img} />
                </div>
                <MarkIcon className={style.markIcon} />
                <div className={style.content}>
                  <p className={style.desc}>{desc}</p>
                  <p className={style.name}>— {name}</p>
                </div>
              </LayoutCard>
            ))
          }
        </div>
      </div>
      <div className={style.logosWrapper}>
        <div className={style.rows}>
          {
            chunk(logoUrls, Math.ceil(logoUrls.length / 2)).map((logos, index) => (
              <div className={style.row} key={index}>
                {
                  logos.map((logo, i) => (
                    <div className={style.logoWrapper} key={i}>
                      <CardImg src={logo} className={style.logo} />
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
