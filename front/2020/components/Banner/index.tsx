/**
 * @file 普通页面的 Banner
 */

import cls from 'classnames'
import React, { CSSProperties, HTMLAttributes } from 'react'
import { useMobile } from 'hooks/ua'
import style from './style.less'

export type Props = HTMLAttributes<HTMLElement> & {
  background: string
  pcBackgroundSize?: string
  mobileBackgroundSize?: string
}

export default function Banner(props: Props) {
  const { background, pcBackgroundSize = '200px', mobileBackgroundSize = '84px', children, className, ...others } = props
  const isMobile = useMobile()

  const contentStyle: CSSProperties = {
    backgroundImage: `url(${background})`,
    backgroundSize: isMobile ? mobileBackgroundSize : pcBackgroundSize
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
