/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Fri May 08 2020
 * @file: 带标题的可被定位的 Block，children 自动居中
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { ReactNode, CSSProperties, createContext, useContext, PropsWithChildren } from 'react'
import classnames from 'classnames'
import { useMobile } from 'hooks/ua'
import { Block, BlockProps, useIndex, useBlocks } from 'components/Product/Navigator'

import style from './index.less'

export { default as SectionArrowLink } from './ArrowLink'

export type ContextValue = {
  /** 是否从灰色开始（默认下标奇数为灰，偶数为白，下标从 0 开始，即，从白色开始） */
  startWithGrey: boolean
}

const context = createContext<ContextValue>({
  startWithGrey: false
})

export function Provider({ children, ...value }: PropsWithChildren<ContextValue>) {
  return <context.Provider value={value}>{children}</context.Provider>
}

export const sectionContext = createContext<{ isGrey?: boolean }>({})

export function useIsGrey() {
  return !!useContext(sectionContext).isGrey
}

export type SectionProps = Pick<BlockProps, 'name' | 'title' | 'render'> & {
  /** 区块的头部内容，默认使用 `title` 的值 */
  /** TODO: title 用于展示导航栏信息，header 用于展示模块标题，subtitle 用于展示模块副标题 */
  /** 从语义上来讲 header 应该包含模块的标题 + 副标题 */
  /** 因此这边再叫 header 就不太合理了，后面需要改掉（titleForView?） */
  header?: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
  grey?: boolean
  style?: CSSProperties
  className?: string
  /** 是否一定有下边距（默认为 false，此时对于移动端的最后一个 Section，会取消下边距） */
  withTailPadding?: boolean
}

export default function Section(props: SectionProps) {
  const { name, title, subtitle = null, header, children, grey: propGrey, withTailPadding, render, ...rest } = props

  const isMobile = useMobile()
  const isPc = !isMobile
  const blocks = useBlocks()
  const blockIndex = useIndex(name)
  const startWithGrey = useContext(context).startWithGrey
  const isEven = blockIndex >= 0 && blockIndex % 2 === 0
  const isOdd = blockIndex >= 0 && blockIndex % 2 === 1
  const greyByIndex = startWithGrey ? isEven : isOdd
  const defaultGrey = isPc ? greyByIndex : false
  const grey = propGrey != null && isPc ? propGrey : defaultGrey
  const isLast = blockIndex === blocks.length - 1
  const blockClassName = classnames(style.blockWraper, grey && style.grey)
  const wrapperClassName = classnames(
    style.wrapper,
    props.className,
    // 移动端的页面上最后一个 section，后边不需要 padding
    // 除非指定了 withTailPadding: true
    isMobile && isLast && !withTailPadding && style.noTailPadding
  )

  function renderMain({ subPaths }: { subPaths?: string[] }) {
    return (
      <div {...rest} className={wrapperClassName}>
        <div className={style.intro}>
          <div className={style.title}>{header != null ? header : title}</div>
          {subtitle ? <div className={style.subtitle}>{subtitle}</div> : null}
        </div>
        <sectionContext.Provider value={{ isGrey: grey }}>
          {render && subPaths ? render({ subPaths }) : children}
        </sectionContext.Provider>
      </div>
    )
  }

  return (
    <Block name={name} title={title} className={blockClassName} render={renderMain} />
  )
}
