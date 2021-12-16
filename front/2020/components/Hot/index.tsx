import React from 'react'
import cls from 'classnames'
import BgIcon from './bg.svg'

import style from './style.less'

export default function Hot({ text = '热门', className }: { text?: string, className?: string }) {
  return (
    <span className={cls(style.hot, className)}>
      <BgIcon />
      <span className={style.text}>{text}</span>
    </span>
  )
}
