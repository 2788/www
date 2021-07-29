import React from 'react'
import style from './style.less'

export default function Tag({ text }: { text: string }) {
  return (
    <div className={style.tag}>
      {text}
    </div>
  )
}
