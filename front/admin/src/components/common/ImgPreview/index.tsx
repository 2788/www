import React, { HTMLAttributes } from 'react'
import cls from 'classnames'
import * as style from './style.m.less'

type Props = HTMLAttributes<HTMLDivElement> & {
  url: string // 移动端是否显示背景图
}

export default function ImgPreview(props: Props) {
  const { url, className } = props
  return <div className={cls(style.icon, className)} style={{ backgroundImage: `url(${url})` }} ></div>
}
