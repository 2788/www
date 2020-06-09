import React, { useRef, useEffect, useContext, PropsWithChildren } from 'react'
import useDelay from 'hooks/use-delay'

import { Context } from '..'
import style from './index.less'
import Empty from './Empty'

export default function Content({ children }: PropsWithChildren<{}>) {
  const ref = useRef<HTMLUListElement>(null)
  const { setActiveMenu, scrollTopMap, registerScrollContainer } = useContext(Context)
  const { start } = useDelay(50)

  useEffect(() => {
    registerScrollContainer(ref.current!)
  }, [registerScrollContainer])

  const scrollTopInfos = Object
    .keys(scrollTopMap)
    .map<[string, number]>(key => [key, scrollTopMap[key]]).sort((a, b) => b[1] - a[1])

  useEffect(() => {
    const elm = ref.current!
    // 不要 debounce
    // 快速切换左侧如果 debounce 会导致可能出现短暂的2个菜单同时 active 的情况
    const handleScroll = function handleScroll() {
      for (const info of scrollTopInfos) {
        if (elm.scrollTop >= info[1]) {
          // delay 一下防止左侧已经是第二个，滑动过程中因为还在第一个导致第一个被选中的情况
          start(() => setActiveMenu(info[0]))
          break
        }
      }
    }

    elm.addEventListener('scroll', handleScroll)

    return () => elm.removeEventListener('scroll', handleScroll)
  }, [scrollTopMap, setActiveMenu, start, scrollTopInfos])

  return (
    <ul ref={ref} className={style.content}>{children}<Empty /></ul>
  )
}
