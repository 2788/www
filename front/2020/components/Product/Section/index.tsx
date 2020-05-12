/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Fri May 08 2020
 * @file: 带标题的可被定位的 Block，children 自动居中
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { ReactNode } from 'react'
import classnames from 'classnames'
import { Block, BlockProps } from 'components/Product/Navigator'

import style from './index.less'

export type SectionProps = Pick<BlockProps, 'name' | 'title'> & {
  /** 区块的头部内容，默认使用 `title` 的值 */
  header?: ReactNode
  children: ReactNode
  grey?: boolean
}

export default function Section(props: SectionProps) {
  const { name, title, header, children, grey = false } = props

  return (
    <Block name={name} title={title} className={classnames(style.blockWraper, grey && style.grey)}>
      <div className={style.wrapper}>
        <div className={style.title}>{header != null ? header : title}</div>
        {children}
      </div>
    </Block>
  )
}
