import React from 'react'
import { chunk } from 'lodash'
import { Img as CardImg } from 'components/UI/Card'
import { logoUrls } from '../constants'
import style from './style.less'

export default function Mobile() {
  return (
    <div className={style.wrapper}>
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
