import React from 'react'
import cls from 'classnames'
import { Carousel } from 'react-icecream-2'
import { chunk } from 'lodash'
import { usePcLg } from 'hooks/ua'
import { LayoutCard, Img as CardImg } from 'components/UI/Card'
import { cardData, CardProps, logoUrls } from '../constants'
import MarkIcon from '../images/mark.svg'
import style from './style.less'

export default function Pc() {
  const isPcLg = usePcLg()
  const logosSize = isPcLg ? 6 : 5
  return (
    <div className={style.wrapper}>
      <Carousel rootHtmlProps={{ className: style.cardsWrapper }} type="secondary">
        {
          chunk(cardData, 3).map((group, index) => (
            <Cards group={group} size={3} key={index} />
          ))
        }
      </Carousel>
      <Carousel rootHtmlProps={{ className: style.logosWrapper }}>
        {
          chunk(logoUrls, logosSize * 3).map((logos, index) => (
            <Logos logos={logos} key={index} size={logosSize} />
          ))
        }
      </Carousel>
    </div>
  )
}

function Cards({ group, size }: { group: CardProps[], size: number }) {
  return (
    <div className={style.group}>
      {
        [...group, ...Array.from({ length: size }).map(() => null)].slice(0, size).map((item, index) => (
          item !== null
            ? (
              <LayoutCard className={style.card} key={index}>
                <div className={style.imgWrapper}>
                  <CardImg src={item.iconUrl} className={style.img} />
                </div>
                <MarkIcon className={style.markIcon} />
                <div className={style.content}>
                  <p className={style.desc} title={item.desc}>{item.desc}</p>
                  <p className={style.name}>— {item.name}</p>
                </div>
              </LayoutCard>
            )
            : <LayoutCard className={cls(style.card, style.invisible)} key={index} />
        ))
      }
    </div>
  )
}

function Logos({ logos, size }: { logos: string[], size: number }) {
  return (
    <div className={style.logos}>
      {
        chunk(logos, size).map((group, i) => (
          <div className={style.row} key={i}>
            {
              [...group, ...Array.from({ length: size }).map(() => null)].slice(0, size).map((logo, index) => (
                logo !== null
                  ? (
                    <div className={style.logoWrapper} key={index}>
                      <CardImg src={logo} className={style.logo} />
                    </div>
                  )
                  : <div className={cls(style.logoWrapper, style.invisible)} key={index} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
