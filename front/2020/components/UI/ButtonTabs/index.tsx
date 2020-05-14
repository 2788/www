/**
 * @file 每个标签长得像 button 的 tab
 */

import React, { PropsWithChildren, createContext, useContext } from 'react'
import style from './style.less'
import Button from '../Button'

type Value = string

type ContextValue = {
  value: Value
  onChange: (value: Value) => void
}

const tabContext = createContext<ContextValue | null>(null)

export type Props = PropsWithChildren<{
  value: Value
  onChange(value: Value): void
}>

export default function ButtonTabs({ value, onChange, children }: Props) {
  return (
    <tabContext.Provider value={{ value, onChange }}>
      <div className={style.wrapper}>
        {children}
      </div>
    </tabContext.Provider>
  )
}

export type ButtonTabProps = PropsWithChildren<{
  value: Value
}>

export function ButtonTab({ value, children }: ButtonTabProps) {
  const contextValue = useContext(tabContext)
  if (!contextValue) {
    throw new Error('Component ButtonTab should be used in ButtonTabs.')
  }

  const active = contextValue.value === value
  const type = active ? 'primary' : 'default'
  return (
    <Button
      className={style.buttonTab}
      type={type}
      withBorder
      onClick={() => contextValue.onChange(value)}
      htmlType="button"
    >{children}</Button>
  )
}
