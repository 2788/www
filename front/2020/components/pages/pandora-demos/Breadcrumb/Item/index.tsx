import React, { PropsWithChildren } from 'react'
import classnames from 'classnames'
import Link from 'components/Link'

import style from './style.less'

export interface IItemProps {
  className?: string
  href?: string
}

export default function Item(props: PropsWithChildren<IItemProps>) {
  const { className, href, children } = props
  if (!href) {
    return (
      <span className={classnames(className, style.disabled)}>{children}</span>
    )
  }
  return <Link {...props} />
}
