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
  const svgWidth = width + (leftArrow ? 14 : 0) + (rightArrow ? 14 : 0)
  const viewBox = `0 0 ${svgWidth} 14`
  const leftArrowPoints = '0 7 14 14 14 0'
  const leftArrowStartFrom = leftArrow ? 14 + width : width
  const rightArrowPoints = `${leftArrowStartFrom} 0 ${leftArrowStartFrom} 14 ${leftArrowStartFrom + 14} 7`
  // ie 不支持 svg transform 属性，改用 css 旋转
  const style: CSSProperties = {
    transform: `rotate(${rotateDeg}deg)`,
    msTransform: `rotate(${rotateDeg}deg)`
  }
  return (
    <svg width={svgWidth} height="14" viewBox={viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={style}>
      {leftArrow && <polygon fill="#AEE1F3" id="箭头" points={leftArrowPoints}></polygon>}
      <rect fill="#AEE1F3" id="矩形" x={leftArrow ? 14 : 0} y="6" width={width} height="2"></rect>
      {rightArrow && <polygon fill="#AEE1F3" id="箭头" points={rightArrowPoints}></polygon>}
    </svg>
  )
}
