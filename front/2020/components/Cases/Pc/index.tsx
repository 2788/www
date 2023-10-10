import React from 'react'
import cls from 'classnames'
import { Carousel } from 'react-icecream-2'
import { chunk } from 'lodash'
import { Img as CardImg } from 'components/UI/Card'
import { logoUrls } from '../constants'
import { CasesProps } from '..'
import style from './style.less'

export default function Pc(props: CasesProps) {
  // 12 个一页
  const groups = chunk(props.customLogoUrls ?? logoUrls, 12)
  return (
    <div className={style.wrapper}>
      <Carousel rootHtmlProps={{ className: style.logosWrapper }}>
        {
          groups.map((logos, index) => (
            <Logos logos={logos} key={index} size={6} />
          ))
        }
      </Carousel>
    </div>
  )
}

function Logos({ logos, size }: { logos: string[], size: number }) {
  const groups = chunk(logos, size)
  return (
    <div className={style.logos}>
      {
        groups.map((group, i) => (
          <div className={style.row} key={i}>
            {
              [...group, ...Array.from({ length: size }).map(() => null)].slice(0, size).map((logo, index) => (
                logo !== null
                  ? (
                    <div className={style.logoWrapper} key={index}>
                      <CardImg src={logo} className={style.logo} />
                    </div>
                  )
                  // 一页只有一行时，不使用占位元素
                  : groups.length > 1 && <div className={cls(style.logoWrapper, style.invisible)} key={index} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
