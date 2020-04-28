import React, { HTMLAttributes } from 'react'
import style from './style.less'

type Props = HTMLAttributes<HTMLDivElement>

export default function Button(props: Props) {
  const className = [
    style.wrapper,
    props.className
  ].filter(Boolean).join(' ')

  return (
    <div {...props} className={className}></div>
  )
}
