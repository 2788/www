/**
 * @file 可切换的 tab 列表
 */

import React, { ReactNode, createContext, useContext } from 'react'
import style from './style.less'

type ContextValue = {
  value: string | null
  onChange: (value: string) => void
}

const tabContext = createContext<ContextValue | null>(null)

export type Props = {
  /** Tabs 的内容，一般是多个 `<Tab>` */
  children: ReactNode
  /** 当前选中的 tab 项的 value */
  value: string | null
  /** 选中 tab 项发生变化时的回调 */
  onChange: (value: string) => void
  /** class 名 */
  className?: string
}

export default function Tabs({ children, className, ...valueAndHandler }: Props) {
  className = [style.wrapper, className].filter(Boolean).join(' ')
  return (
    <ul className={className}>
      <tabContext.Provider value={valueAndHandler}>
        {children}
      </tabContext.Provider>
    </ul>
  )
}

export type TabProps = {
  /** 当前 tab 项对应的值 */
  value: string
  /** Tab 内容 */
  children: ReactNode
}

export function Tab({ value, children }: TabProps) {
  const contextValue = useContext(tabContext)
  if (!contextValue) {
    throw new Error('Component Tab should be used in Tabs.')
  }

  const active = contextValue.value === value
  const onClick = () => contextValue.onChange(value)
  const className = [style.item, active && style.active].filter(Boolean).join(' ')

  return (
    <li className={className} onClick={onClick}>
      {children}
    </li>
  )
}
