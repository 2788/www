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
import { Block } from 'components/Product/Navigator'

import style from './index.less'

export type SectionProps = {
  name: string
  title: string
  children: ReactNode
  grey?: boolean
}

export default function Section(props: SectionProps) {
  const { name, title, children, grey = false } = props

  return (
    <Block name={name} title={title} className={classnames(style.blockWraper, grey && style.grey)}>
      <div className={style.wrapper}>
        <div className={style.title}>{title}</div>
        {children}
      </div>
    </Block>
  )
}
