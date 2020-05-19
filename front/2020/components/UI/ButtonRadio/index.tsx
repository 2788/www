/**
 * @file 长得像 button 的 radio
 */

import React, { PropsWithChildren, createContext, useContext } from 'react'
import style from './style.less'

type ContextValue = {
  value: string | null
  onChange(value: string): void
}

const ctx = createContext<ContextValue | null>(null)

export type Props = PropsWithChildren<{
  value: string | null
  onChange(value: string | null): void
  className?: string
}>

export default function ButtonRadioGroup({ value, onChange, className, children }: Props) {
  const wrapperClassName = [style.radioGroup, className].filter(Boolean).join(' ')
  return (
    <div className={wrapperClassName}>
      <ctx.Provider value={{ value, onChange }}>
        {children}
      </ctx.Provider>
    </div>
  )
}

type ButtonRadioProps = PropsWithChildren<{
  value: string
  className?: string
}>

export function ButtonRadio({ value, className, children }: ButtonRadioProps) {
  const ctxValue = useContext(ctx)
  if (!ctxValue) {
    throw new Error('Component ButtonRadio should be used in ButtonRadioGroup.')
  }
  const wrapperClassName = [style.radio, value === ctxValue.value && style.active, className].filter(Boolean).join(' ')
  return (
    <div className={wrapperClassName} onClick={() => ctxValue.onChange(value)}>{children}</div>
  )
}
