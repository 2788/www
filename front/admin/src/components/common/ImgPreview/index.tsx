import React, { HTMLAttributes } from 'react'
import cls from 'classnames'

import style from './style.m.less'

type Props = HTMLAttributes<HTMLDivElement> & {
  url: string // 移动端是否显示背景图
}

export default function ImgPreview(props: Props) {
  const { url, className, ...rest } = props
  return <div className={cls(style.icon, className)} style={{ backgroundImage: `url(${url})` }} {...rest}></div>
}
