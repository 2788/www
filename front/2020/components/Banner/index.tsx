/**
 * @file 普通页面的 Banner
 */

import cls from 'classnames'
import React, { CSSProperties, HTMLAttributes } from 'react'
import { assign } from 'lodash'
import { useMobile } from 'hooks/ua'
import style from './style.less'

export type Props = HTMLAttributes<HTMLElement> & {
  background: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundAnchor?: 'root' | 'content'
}

export default function Banner(props: Props) {
  const {
    background,
    backgroundSize = '200px',
    backgroundPosition,
    backgroundAnchor = 'content',
    children,
    className,
    ...others
  } = props
  const isMobile = useMobile()

  const backgroundStyle: CSSProperties = {
    backgroundImage: isMobile ? 'none' : `url(${background})`,
    backgroundSize,
    backgroundPosition
  }

  const rootProps = assign(
    {
      className: cls(style.banner, className),
      ...others
    },
    backgroundAnchor === 'root' && { style: backgroundStyle }
  )

  const contentProps = assign(
    { className: style.bannerContent },
    backgroundAnchor === 'content' && { style: backgroundStyle }
  )

  return (
    <div {...rootProps}>
      <div {...contentProps}>{children}</div>
    </div>
  )
}

export function Title({ className, ...others }: HTMLAttributes<HTMLElement>) {
  return <h1 className={cls(style.title, className)} {...others} />
}

export function Desc({ className, ...others }: HTMLAttributes<HTMLElement>) {
  return <p className={cls(style.desc, className)} {...others} />
}
