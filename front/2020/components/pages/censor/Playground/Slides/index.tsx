/**
 * @file 内容审核功能体验模块轮播组件
 */

import React, { PropsWithChildren, ReactNode, createContext, useContext } from 'react'

import style from './style.less'

export type Props = PropsWithChildren<{
  value: number | null
  onChange(value: number): void
  renderActive(value: number): ReactNode
}>

type ContextValue = {
  value: number | null
  onChange(value: number): void
}

const ctx = createContext<ContextValue | null>(null)

export default function Slides({ value, onChange, renderActive, children }: Props) {

  return (
    <div className={style.slides}>
      <div className={style.activeBlock}>
        {value != null && renderActive(value)}
      </div>
      <ul className={style.thumbnails}>
        <ctx.Provider value={{ value, onChange }}>
          {children}
        </ctx.Provider>
      </ul>
    </div>
  )
}

export type SlideProps = PropsWithChildren<{
  value: number
}>

export function Slide({ value, children }: SlideProps) {
  const ctxValue = useContext(ctx)
  if (!ctxValue) {
    throw new Error('Component Slide should be used in Slides.')
  }

  const className = [
    style.slide,
    ctxValue.value === value && style.active
  ].filter(Boolean).join(' ')

  return (
    <li className={className} onClick={() => ctxValue.onChange(value)}>
      {children}
    </li>
  )
}
