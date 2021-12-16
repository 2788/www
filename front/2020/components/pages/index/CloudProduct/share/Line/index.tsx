import React, { CSSProperties } from 'react'

export type Props = {
  // 箭头之间的 rect 的宽度
  width: number
  rotateDeg?: number
  // 左边的箭头默认关闭
  leftArrow?: boolean
  // 右边的箭头默认打开
  rightArrow?: boolean
}

export default function Line({ width = 0, rotateDeg = 0, leftArrow = false, rightArrow = true }: Props) {
  const svgWidth = width + (leftArrow ? 5 : 0) + (rightArrow ? 5 : 0)
  const viewBox = `0 0 ${svgWidth} 5`
  const leftArrowPoints = '0 2.5 5 5 5 0'
  const leftArrowStartFrom = leftArrow ? 5 + width : width
  const rightArrowPoints = `${leftArrowStartFrom} 0 ${leftArrowStartFrom} 5 ${leftArrowStartFrom + 5} 2.5`
  // ie 不支持 svg transform 属性，改用 css 旋转
  const style: CSSProperties = {
    transform: `rotate(${rotateDeg}deg)`,
    msTransform: `rotate(${rotateDeg}deg)`
  }
  return (
    <svg width={svgWidth} height="5" viewBox={viewBox} style={style}>
      {leftArrow && <polygon fill="#AEE1F3" points={leftArrowPoints}></polygon>}
      <rect fill="#A7E8FF" x={leftArrow ? 5 : 0} y="2" width={width} height="1"></rect>
      {rightArrow && <polygon fill="#AEE1F3" points={rightArrowPoints}></polygon>}
    </svg>
  )
}
