import React from 'react'
import BgIcon from './bg.svg'

import style from './style.less'

export default function Hot({ text = '热门' }: { text?: string }) {
  return (
    <span className={style.hot}>
      <BgIcon />
      <span className={style.text}>{text}</span>
    </span>
  )
}
