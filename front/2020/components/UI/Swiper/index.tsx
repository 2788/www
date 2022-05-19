/**
 * @file 滚动轮播组件
 * @description 以及配套的翻页、箭头组件
 */

import React, { PropsWithChildren, Children, useRef, useEffect, useCallback } from 'react'
import Carousel from 'react-icecream/lib/carousel'
import cns from 'classnames'

import IconArrowPrev from './arrow-prev.svg'
import IconArrowNext from './arrow-next.svg'
import style from './style.less'

type Type = 'classic' | 'secondary'

export type Props = PropsWithChildren<{
  index?: number
  onIndexChange?(index: number): void
  type?: Type
  withArrow?: boolean
  withPagination?: boolean
  autoplay?: boolean
}>

const typeStyleMap: Record<Type, string> = {
  classic: style.typeClassic,
  secondary: style.typeSecondary
}

export default function Swiper({
  type = 'secondary', index, onIndexChange, withArrow, withPagination, autoplay, children
}: Props) {
  const carouselRef = useRef<Carousel>(null)
  const wrappedChildren = Children.map(children, (child, i) => (
    <div key={i} className={style.pageWrapper}>{child}</div>
  ))

  // index 变化对应地控制轮播组件
  useEffect(() => {
    if (index != null && carouselRef.current) {
      carouselRef.current.goTo(index)
    }
  }, [index])

  const handleChange = useCallback((currentIndex: number) => {
    if (index !== currentIndex && onIndexChange) {
      onIndexChange(currentIndex)
    }
  }, [index, onIndexChange])

  const handlePrevClick = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.prev()
    }
  }, [])

  const handleNextClick = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.next()
    }
  }, [])

  return (
    <div className={cns(style.wrapper, typeStyleMap[type])}>
      {withArrow && <ArrowPrev onClick={handlePrevClick} />}
      {withArrow && <ArrowNext onClick={handleNextClick} />}
      <Carousel ref={carouselRef} afterChange={handleChange} dots={withPagination} autoplay={autoplay}>
        {wrappedChildren}
      </Carousel>
    </div>
  )
}

export type ArrowProps = {
  onClick(): void
  className?: string
}

export function ArrowPrev({ onClick, className }: ArrowProps) {
  const wrapperClassName = join(style.arrowPrev, className)
  return (
    <div className={wrapperClassName} onClick={onClick}>
      <IconArrowPrev className={style.icon} />
    </div>
  )
}

export function ArrowNext({ onClick, className }: ArrowProps) {
  const wrapperClassName = join(style.arrowNext, className)
  return (
    <div className={wrapperClassName} onClick={onClick}>
      <IconArrowNext className={style.icon} />
    </div>
  )
}

function join(...classNames: any[]) {
  return classNames.filter(Boolean).join(' ')
}
