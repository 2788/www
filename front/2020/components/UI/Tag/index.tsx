import React from 'react'
import cln from 'classnames'
import style from './style.less'

export default function Tag({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cln(style.tag, className)}>
      {text}
    </div>
  )
}
