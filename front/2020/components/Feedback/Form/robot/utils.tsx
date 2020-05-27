/**
 * @file 用于构建消息内容的辅助工具
 */

import React, { createContext, PropsWithChildren, useContext, useCallback, MouseEvent } from 'react'
import { MessageContent, Input, IRobot } from '.'

/**
 * 把机器人的最小处理时间延长为指定 delay 值（单位 ms）
 * 即，如果某次回复距离用户输入时间小于 delay，则将回复推迟到 delay 对应的时间点，感觉上更自然
 */
export const withEase = (delay: number) => (robot: IRobot): IRobot => ({
  process(input: Input) {
    const processed = robot.process(input)
    const items = Array.isArray(processed) ? processed : [processed]
    // TODO: 优化这边，每两个 item resolve 间隔也应该至少为 delay
    return items.map(async item => {
      await timeout(delay)
      return item
    })
  }
})

function timeout(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export type ContextValue = {
  sendMessage(cnt: MessageContent): void
}

export const context = createContext<ContextValue | null>(null)

export type MessageLinkProps = PropsWithChildren<{
  message: MessageContent
}>

export function MessageLink({ message, children }: MessageLinkProps) {
  const ctxValue = useContext(context)
  if (!ctxValue) {
    throw new Error('component MessageLink should be used inside robot Provider.')
  }
  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault()
    ctxValue.sendMessage(message)
  }, [ctxValue, message])
  return (
    <a onClick={handleClick}>{children}</a>
  )
}
