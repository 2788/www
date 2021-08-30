/**
 * @file 长得像 button 的 radio
 * @todo 基于 icecream-2 实现或干脆换成直接用 icecream-2
 */

import React, { PropsWithChildren, createContext, useContext, ReactNode } from 'react'
import style from './style.less'

type Value = string | number

type ContextValue<T extends Value> = {
  value: T | null
  onChange(value: T): void
}

const ctx = createContext<ContextValue<Value> | null>(null)

function useCtx<T extends Value>() {
  return useContext<ContextValue<T> | null>(ctx as any)
}

function Provider<T extends Value>({ value, children }: { value: ContextValue<T>, children: ReactNode }) {
  return (
    <ctx.Provider value={value}>
      {children}
    </ctx.Provider>
  )
}

export type Props<T extends Value> = PropsWithChildren<{
  value: T | null
  onChange(value: T | null): void
  className?: string
}>

export default function ButtonRadioGroup<T extends Value>({ value, onChange, className, children }: Props<T>) {
  const wrapperClassName = [style.radioGroup, className].filter(Boolean).join(' ')
  return (
    <div className={wrapperClassName}>
      <Provider<T> value={{ value, onChange }}>
        {children}
      </Provider>
    </div>
  )
}

export type ButtonRadioProps<T extends Value> = PropsWithChildren<{
  value: T
  className?: string
}>

export function ButtonRadio<T extends Value>({ value, className, children }: ButtonRadioProps<T>) {
  const ctxValue = useCtx<T>()
  if (!ctxValue) {
    throw new Error('Component ButtonRadio should be used in ButtonRadioGroup.')
  }
  const wrapperClassName = [style.radio, value === ctxValue.value && style.active, className].filter(Boolean).join(' ')
  return (
    <div className={wrapperClassName} onClick={() => ctxValue.onChange(value)}>{children}</div>
  )
}
