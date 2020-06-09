import React from 'react'

import { Props } from '..'
import ArrowRightIcon from './arrow-right.svg'
import style from './index.less'

export default function Mobile({ androidUrl, iosUrl }: Props) {
  return (
    <ul>
      <li className={style.li}>
        <a
          href={iosUrl}
          target="_blank"
          rel="noopener"
          className={style.item}
        >
          iOS Demo 体验 <ArrowRightIcon />
        </a>
      </li>
      <li className={style.li}>
        <a href={androidUrl} target="_blank" rel="noopener" className={style.item}>
          Android Demo 体验 <ArrowRightIcon />
        </a>
      </li>
    </ul>
  )
}
