import React, { HTMLAttributes } from 'react'
import classnames from 'classnames'

import style from './index.less'

export type Props = HTMLAttributes<HTMLElement> & {
  loading?: boolean
}

export default function Loading({ loading, children, className, ...others }: Props) {

  loading = loading === undefined ? true : loading

  const animationView = (
    <div className={style.animation}>
      <div className={style.dots}>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
      </div>
    </div>
  )

  const wrapperClassName = classnames(style.wrapper, loading && style.loading, className)

  return (
    <div className={wrapperClassName} {...others}>
      {animationView}
      <div className={style.contentWrapper}>{children}</div>
    </div>
  )
}
