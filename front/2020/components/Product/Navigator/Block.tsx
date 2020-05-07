/**
 * @file 可导航区块
 * @description 注册在 Navigatable 中，对应 Navigator 中的一个 tab
 */

import React, { ReactNode, useContext, useRef, useEffect } from 'react'
import { context } from './utils'

export type Props = {
  name: string
  title: string
  children: ReactNode
}

/** 可导航块 */
export default function Block({ name, title, children }: Props) {
  const contextValue = useContext(context)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // 将当前 block 信息向上注册
  const register = contextValue?.register
  useEffect(() => {
    if (!register) {
      return
    }
    // 这会肯定有 wrapper 了
    const wrapper = wrapperRef.current!
    register({
      name,
      title,
      offsetTop: wrapper.offsetTop,
      offsetHeight: wrapper.offsetHeight
    })
  }, [register, name, title])

  if (!contextValue) {
    throw new Error('Component `Block` should be used in `Navigatable`')
  }

  return (
    // 这里不添加 id，是为了避免 hash 变化时浏览器自动定位的行为
    <div ref={wrapperRef} data-block-name={name}>
      {children}
    </div>
  )
}

