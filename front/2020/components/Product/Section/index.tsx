/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Fri May 08 2020
 * @file: 带标题的可被定位的 Block，children 自动居中
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { ReactNode, CSSProperties } from 'react'
import classnames from 'classnames'
import { useMobile } from 'hooks/ua'
import { Block, BlockProps, useIndex, useBlocks } from 'components/Product/Navigator'

import style from './index.less'

export type SectionProps = Pick<BlockProps, 'name' | 'title'> & {
  /** 区块的头部内容，默认使用 `title` 的值 */
  /** TODO: title 用于展示导航栏信息，header 用于展示模块标题，subtitle 用于展示模块副标题 */
  /** 从语义上来讲 header 应该包含模块的标题 + 副标题 */
  /** 因此这边再叫 header 就不太合理了，后面需要改掉（titleForView?） */
  header?: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  grey?: boolean
  style?: CSSProperties
  className?: string
}

export default function Section(props: SectionProps) {
  const { name, title, subtitle = null, header, children, grey: propGrey, ...rest } = props

  const isPc = !useMobile()
  const blocks = useBlocks()
  const blockIndex = useIndex(name)
  const defaultGrey = (
    isPc && blockIndex >= 0
    ? (blockIndex % 2 === 1) // PC 端默认下标基数为灰，偶数为白（下标从 0 开始）
    : false
  )
  const grey = propGrey != null ? propGrey : defaultGrey
  const isLast = blockIndex === blocks.length - 1
  const blockClassName = classnames(style.blockWraper, grey && style.grey)
  const wrapperClassName = classnames(style.wrapper, props.className, isLast && style.last)

  return (
    <Block name={name} title={title} className={blockClassName}>
      <div {...rest} className={wrapperClassName}>
        <div className={style.intro}>
          <div className={style.title}>{header != null ? header : title}</div>
          {subtitle ? <div className={style.subtitle}>{subtitle}</div> : null}
        </div>
        {children}
      </div>
    </Block>
  )
}
