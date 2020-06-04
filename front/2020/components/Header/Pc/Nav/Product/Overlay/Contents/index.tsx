import React, { useRef, useEffect } from 'react'
import { useSmoothElementScrollTo } from 'hooks/scroll'
import { Category } from 'constants/products'

import Storage from './Storage'
import Service from './Service'
import Video from './Video'
import Intelligence from './Intelligence'
import Empty from './Empty'

import style from './index.less'

type ScrollTopMap = { [key in Category]: number }

export default function Content({ content = Category.Storage }: { content: Category }) {
  const containerRef = useRef<HTMLUListElement>(null)
  const scrollTopMapRef = useRef<ScrollTopMap>({
    [Category.Storage]: 0,
    [Category.Service]: 0,
    [Category.Video]: 0,
    [Category.Intelligence]: 0
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
      <Storage registerScrollTop={handleRegisterScrollTop(Category.Storage)} />
      <Service registerScrollTop={handleRegisterScrollTop(Category.Service)} />
      <Video registerScrollTop={handleRegisterScrollTop(Category.Video)} />
      <Intelligence registerScrollTop={handleRegisterScrollTop(Category.Intelligence)} />
      <Empty />
    </ul>
  )
}
