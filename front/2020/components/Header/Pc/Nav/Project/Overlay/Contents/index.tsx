import React, { useRef, useEffect } from 'react'
import { useSmoothElementScrollTo } from 'hooks/scroll'
import { Category } from 'constants/solutions'

import Industry from './Industry'
import Scene from './Scene'
import style from './index.less'
import Empty from './Empty'

type ScrollTopMap = { [key in Category]: number }

export default function Content({ content = Category.Scene }: { content: Category }) {
  const containerRef = useRef<HTMLUListElement>(null)
  const scrollTopMapRef = useRef<ScrollTopMap>({
    [Category.Industry]: 0,
    [Category.Scene]: 0
  })

  const setScrollTop = useSmoothElementScrollTo(containerRef)

  useEffect(() => {
    setScrollTop(scrollTopMapRef.current[content])
  }, [content, setScrollTop])

  function handleRegisterScrollTop(category: Category) {
    return (value: number) => {
      scrollTopMapRef.current[category] = value
    }
  }

  return (
    <ul ref={containerRef} className={style.content}>
      <Scene registerScrollTop={handleRegisterScrollTop(Category.Scene)} />
      <Industry registerScrollTop={handleRegisterScrollTop(Category.Industry)} />
      <Empty />
    </ul>
  )
}
