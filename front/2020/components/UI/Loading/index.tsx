import React, { PropsWithChildren } from 'react'
import classnames from 'classnames'

import style from './index.less'

export default function Loading({ loading, children }: PropsWithChildren<{ loading: boolean }>) {
  const animation = (
    <div className={style.animation}>
      <div className={style.dots}>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
      </div>
    </div>
  )
  return (
    <div className={style.wrapper}>
      {loading && animation}
      <div className={classnames(loading && style.loading)}>{children}</div>
    </div>
  )
}
