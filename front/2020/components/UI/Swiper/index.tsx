/**
 * @file 滚动轮播组件
 * @description 以及配套的翻页、箭头组件
 */

import React, { PropsWithChildren, Children, useRef, useEffect, useCallback } from 'react'
import Carousel from 'react-icecream/lib/carousel'

import IconArrowPrev from './arrow-prev.svg'
import IconArrowNext from './arrow-next.svg'
import style from './style.less'

export type Props = PropsWithChildren<{
  index?: number
  onIndexChange?(index: number): void
  withArrow?: boolean
  withPagination?: boolean
}>

export default function Swiper({ index, onIndexChange, withArrow, withPagination, children }: Props) {
  const carouselRef = useRef<Carousel>(null)
  const wrappedChildren = Children.map(children, child => (
    <div className={style.pageWrapper}>{child}</div>
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
    <div className={style.wrapper}>
      {withArrow && <ArrowPrev onClick={handlePrevClick} />}
      {withArrow && <ArrowNext onClick={handleNextClick} />}
      <Carousel ref={carouselRef} afterChange={handleChange} dots={withPagination}>
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
