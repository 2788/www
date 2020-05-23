/**
 * @file 普通页面的 Banner
 */

// TODO: 能用这个 banner 的尽量用这个 banner

import cls from 'classnames'
import React, { CSSProperties, HTMLAttributes } from 'react'
import style from './style.less'

export type Props = HTMLAttributes<HTMLElement> & {
  background: string
  backgroundSize?: string
}

export default function Banner({ background, backgroundSize, children, className, ...others }: Props) {

  const contentStyle: CSSProperties = {
    backgroundImage: `url(${background})`,
    backgroundSize
  }

  return (
    <div className={cls(style.banner, className)} {...others}>
      <div className={style.bannerContent} style={contentStyle}>
        {children}
      </div>
    </div>
  )
}

export function Title({ className, ...others }: HTMLAttributes<HTMLElement>) {
  return <h1 className={cls(style.title, className)} {...others} />
}

export function Desc({ className, ...others }: HTMLAttributes<HTMLElement>) {
  return <p className={cls(style.desc, className)} {...others} />
}
