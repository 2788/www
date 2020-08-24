import React, { ReactNode } from 'react'
import Link from 'components/Link'

import Arrow from './arrow.svg'
import style from './index.less'

export type Props = {
  href?: string
  onClick?: () => void
  children: ReactNode
}

export default function ArrowLink({ href, onClick, children }: Props) {
  return <Link href={href} onClick={onClick} className={style.link} blue>{children}&nbsp;<Arrow /></Link>
}
