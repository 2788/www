import React from 'react'
import cls from 'classnames'
import { Carousel } from 'react-icecream-2'
import { chunk } from 'lodash'
import { Img as CardImg } from 'components/UI/Card'
import { logoUrls } from '../constants'
import style from './style.less'

export default function Pc() {
  return (
    <div className={style.wrapper}>
      <Carousel rootHtmlProps={{ className: style.logosWrapper }}>
        {
          chunk(logoUrls, 12).map((logos, index) => (
            <Logos logos={logos} key={index} size={6} />
          ))
        }
      </Carousel>
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
