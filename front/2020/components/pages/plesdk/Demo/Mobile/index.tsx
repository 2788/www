import React from 'react'
import ArrowRightIcon from './arrow-right.svg'

import style from './index.less'

export default function Mobile() {
  return (
    <ul>
      <li>
        <a
          href="http://d.alphaqr.com/y4qk?utm_source=fir&utm_medium=qr"
          target="_blank noopener"
          className={style.item}
        >
          iOS Demo 体验 <ArrowRightIcon />
        </a>
      </li>
      <li>
        <a
          href="http://d.alphaqr.com/t1vp?utm_source=fir&utm_medium=qr"
          target="_blank noopener"
          className={style.item}
        >
          Android Demo 体验 <ArrowRightIcon />
        </a>
      </li>
    </ul>
  )
}
