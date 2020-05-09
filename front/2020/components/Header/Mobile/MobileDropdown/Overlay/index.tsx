import React, { ReactNode } from 'react'
import Link from 'next/link'

import Logo from '../../../logo.svg'
import Close from './close.svg'
import style from './style.less'

type Props = {
  onClose(): void
  children: ReactNode
}

export default function Overlay({ children, onClose }: Props) {
  return (
    <div className={style.overlay}>
      <div className={style.header}>
        <Link href="/"><a className={style.logo}><Logo /></a></Link>
        <Close onClick={onClose} />
      </div>
      {children}
    </div>
  )
}
