/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon Jul 06 2020
 * @file: 描述子组件位置信息的组件，自带 fadein 和 flip 动画
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { ReactNode, useRef, useEffect, useContext } from 'react'
import useIsomorphicLayoutEffect from 'hooks/use-isomorphic-layout-effect'
import { Context } from '..'

export type Props = {
  identity?: string
  top: number
  left: number
  zIndex?: number
  animated?: boolean
  children: ReactNode
}

export default function Positioned(props: Props) {
  const { children, animated = true, identity, top, left, zIndex } = props
  const ref = useRef<HTMLDivElement>(null)
  const { getPrevOffset, registerOffset } = useContext(Context)

  useIsomorphicLayoutEffect(() => {
    if (!animated) return
    if (!identity) {
      animateFadein(ref.current!)
      return
    }
    const prevOffset = getPrevOffset(identity)

    // 之前没有位置信息说明是立即出现的，这种做 fadein
    if (prevOffset === undefined) {
      animateFadein(ref.current!)
      return
    }
    const invertLeft = prevOffset.left - left
    const invertTop = prevOffset.top - top

    const keyframes = [
      {
        transform: `translate(${invertLeft}px, ${invertTop}px)`
      },
      { transform: 'translate(0)' }
    ]
    const options: KeyframeAnimationOptions = {
      duration: 300,
      easing: 'ease-in-out'
    }
    // eslint-disable-next-line no-unused-expressions
    ref.current?.animate?.(keyframes, options)
  }, [animated, left, top])

  useEffect(() => {
    if (identity) {
      registerOffset(identity, { top, left })
    }
  }, [registerOffset, identity, top, left])

  return (
    <div ref={ref} style={{ position: 'absolute', top, left, zIndex }}>
      {children}
    </div>
  )
}

function animateFadein(element: HTMLElement) {
  const keyframes: Keyframe[] = [
    { opacity: 0 },
    { opacity: 1 }
  ]
  const options: KeyframeAnimationOptions = {
    duration: 500,
    easing: 'ease-in-out'
  }
  // eslint-disable-next-line no-unused-expressions
  element.animate?.(keyframes, options)
}
