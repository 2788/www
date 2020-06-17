/**
 * @file 解决方案页面 banner 底部内容
 * @description 一般用于以结构化的形式展示 banner 信息的补充
 * @description 样式与 components/Product/PageNotice 类似，后续可以考虑合并实现
 */

import cls from 'classnames'
import React, { PropsWithChildren } from 'react'
import style from './style.less'

export type Props = PropsWithChildren<{
  className?: string
}>

export default function BannerFooter({ children, className }: Props) {
  return (
    <div className={style.wrapper}>
      <div className={cls(style.main, className)}>
        {children}
      </div>
    </div>
  )
}
