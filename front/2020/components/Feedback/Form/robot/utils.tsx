/**
 * @file 用于构建消息内容的辅助工具
 */

import React, { createContext, PropsWithChildren, useContext, useCallback, MouseEvent, useEffect, ReactNode } from 'react'
import { MessageContent, Input, IRobot, MaybeAsyncOutput, Output, makeAction } from '.'
import style from './style.less'

/**
 * 把机器人的最小处理时间延长为指定 delay 值（单位 ms）
 * 即，如果某次回复距离用户输入时间小于 delay，则将回复推迟到 delay 对应的时间点，感觉上更自然
 */
export const withEase = (delay: number) => (robot: IRobot): IRobot => ({
  async process(input: Input) {
    const processed = await robot.process(input)
    const items = Array.isArray(processed) ? processed : [processed]
    const easedItems: MaybeAsyncOutput[] = []
    items.forEach((item, i) => {
      easedItems.push((async () => {
        if (i > 0) await easedItems[i - 1]
        await timeout(delay)
        return item
      })())
    })
    return easedItems
  }
})

function timeout(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export type Disposer = () => void

export type ContextValue = {
  sendMessage(cnt: MessageContent): void
  sendInput(input: Input): void
  addDisposer(disposer: Disposer): () => void
}

export const context = createContext<ContextValue | null>(null)

export function useMustContext() {
  const ctxValue = useContext(context)
  if (!ctxValue) {
    throw new Error('component MessageLink should be used inside robot Provider.')
  }
  return ctxValue
}

export type MessageLinkProps = PropsWithChildren<{
  message: MessageContent
}>

/** 点了就会帮助用户发送指定消息的 link */
export function MessageLink({ message, children }: MessageLinkProps) {
  const ctxValue = useMustContext()
  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault()
    ctxValue.sendMessage(message)
  }, [ctxValue, message])
  return (
    <a onClick={handleClick}>{children}</a>
  )
}

/** 添加对话结束时的回调函数 */
export function useDisposer(disposer: Disposer) {
  const ctxValue = useMustContext()
  const addDisposer = ctxValue.addDisposer
  useEffect(
    () => addDisposer(disposer),
    [addDisposer, disposer]
  )
}

export type MessageSelectProps = {
  children: ReactNode
  before?: string
  after?: string
}

/** 简单的选择组件，让用户在多个选项中选择一个 */
export function MessageSelect({ children, before, after }: MessageSelectProps) {
  return (
    <div className={style.messageSelect}>
      {before && <p className={style.before}>{before}</p>}
      <ul className={style.options}>
        {children}
      </ul>
      {after && <p className={style.after}>{after}</p>}
    </div>
  )
}

export interface MessageSelectOptionProps {
  children: string
  onClick?: () => void
}

export function MessageSelectOption({ children, onClick }: MessageSelectOptionProps) {
  const ctxValue = useMustContext()
  onClick = onClick || (() => ctxValue.sendMessage(children))
  return (
    <li className={style.option} onClick={onClick}>{children}</li>
  )
}

/** 长选择组件，用法同 MessageSelect，适用于较长的选项 */
function LongMessageSelect({ children, before, after }: MessageSelectProps) {
  return (
    <div className={style.longMessageSelect}>
      {before && <p className={style.before}>{before}</p>}
      <ol className={style.options}>
        {children}
      </ol>
      {after && <p className={style.after}>{after}</p>}
    </div>
  )
}

// 暂不支持 onClick，需要的时候再支持
export function LongMessageSelectOption({ children }: Omit<MessageSelectOptionProps, 'onClick'>) {
  return (
    <li className={style.option}>
      <MessageLink message={children}>{children}</MessageLink>
    </li>
  )
}

/** 构造让用户选择一个选项的输出 */
export function makeSelect(params: {
  options: string[]
  after?: string
  before?: string
  mode?: 'long' | 'short'
}): Output {
  const { mode, options, ...otherParams } = params
  const optionsView = options.map(option => (
    mode === 'long'
    ? <LongMessageSelectOption key={option}>{option}</LongMessageSelectOption>
    : <MessageSelectOption key={option}>{option}</MessageSelectOption>
  ))
  return makeAction(
    mode === 'long'
    ? <LongMessageSelect {...otherParams}>{optionsView}</LongMessageSelect>
    : <MessageSelect {...otherParams}>{optionsView}</MessageSelect>
  )
}
