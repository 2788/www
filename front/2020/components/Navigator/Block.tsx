/**
 * @file 可导航区块
 * @description 注册在 Navigatable 中，对应 Navigator 中的一个 tab
 */

import React, { ReactNode, useContext, useRef, useEffect } from 'react'
import { context, BlockInfo } from './utils'

export type Props = Pick<BlockInfo, 'name' | 'title'> & {
  children?: ReactNode
  className?: string
  render?: (props: { subPaths: string[] }) => ReactNode
}

/** 可导航块 */
export default function Block({ name, title, children, className = '', render }: Props) {
  const contextValue = useContext(context)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const active = contextValue?.active
  const subPaths = active ? active.split('/').slice(1) : []

  // 将当前 block 信息向上注册
  const register = contextValue?.registerBlock
  useEffect(() => {
    if (!register) {
      return
    }
    // 这会肯定有 wrapper 了
    const wrapper = wrapperRef.current!
    register({
      name,
      title,
      wrapper
    })
  }, [register, name, title])

  if (!contextValue) {
    throw new Error('Component `Block` should be used in `Navigatable`')
  }

  return (
    // 这里不添加 id，是为了避免 hash 变化时浏览器自动定位的行为
    <div ref={wrapperRef} data-block-name={name} className={className}>
      {render ? render({ subPaths }) : children}
    </div>
  )
}

