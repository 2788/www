import React, { ReactNode, useRef, useEffect } from 'react'
import useIsomorphicLayoutEffect from 'hooks/use-isomorphic-layout-effect'

export type Props = {
  top?: number
  left?: number
  zIndex?: number
  // 开启动画 开启动画的属性只能用 top 和 left 表示
  animated?: boolean
  children: ReactNode
}

export default function Positioned(props: Props) {
  const { children, animated = true, ...rest } = props
  const ref = useRef<HTMLDivElement>(null)
  const prevPosition = useRef<typeof rest>()

  useIsomorphicLayoutEffect(() => {
    if (!animated) return
    // 之前没有位置信息说明是立即出现的，这种做 fadein
    if (prevPosition.current === undefined) {
      const keyframes: Keyframe[] = [
        { opacity: 0 },
        { opacity: 1 }
      ]
      const options: KeyframeAnimationOptions = {
        duration: 300,
        easing: 'ease-in-out'
      }
      // eslint-disable-next-line no-unused-expressions
      ref.current?.animate?.(keyframes, options)
      return
    }
    const invertLeft = (prevPosition.current?.left || 0) - (rest.left || 0)
    const invertTop = (prevPosition.current?.top || 0) - (rest.top || 0)

    const keyframes = [
      {
        // 懒得把 right 转成 left，约定下用 left 好了
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
  }, [animated, rest.left, rest.top])

  useEffect(() => {
    prevPosition.current = rest
  }, [rest])

  return (
    <div ref={ref} style={{ position: 'absolute', ...rest }}>
      {children}
    </div>
  )
}
