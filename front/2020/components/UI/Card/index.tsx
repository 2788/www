/**
 * @file 卡片集合
 * @description 多个卡片的集合，卡片内容支持图片、标题 & 段落
 * @description 已知用到的地方：机器数据分析平台/功能与优势，解决方案页面 > 应用场景
 */

import React, { HTMLAttributes, CSSProperties } from 'react'

import style from './style.less'

export function Row({ className, ...others }: HTMLAttributes<HTMLElement>) {
  const wrapperClassName = [style.row, className].filter(Boolean).join(' ')
  return <div className={wrapperClassName} {...others} />
}

export function Card({ className, ...others }: HTMLAttributes<HTMLElement>) {
  const wrapperClassName = [style.card, className].filter(Boolean).join(' ')
  return <section className={wrapperClassName} {...others} />
}

/** 仅布局用的卡片，没有边框、阴影等样式 */
export function LayoutCard({ className, ...others }: HTMLAttributes<HTMLElement>) {
  const wrapperClassName = [style.card, style.layout, className].filter(Boolean).join(' ')
  return <section className={wrapperClassName} {...others} />
}

/** 隐形卡片，占位用 */
export function InvisibleCard({ children, ...others }: HTMLAttributes<HTMLElement>) {
  return <LayoutCard {...others}>{null}</LayoutCard>
}

export type ImgProps = HTMLAttributes<HTMLElement> & {
  src: string
}

export function Img({ className, src, style: customStyle, ...others }: ImgProps) {
  const wrapperClassName = [style.imgWrapper, className].filter(Boolean).join(' ')
  const wrapperStyle: CSSProperties = {
    ...customStyle,
    backgroundImage: `url("${src}")`
  }
  return (
    <div className={wrapperClassName} style={wrapperStyle} {...others} />
  )
}

export function Content({ className, ...others }: HTMLAttributes<HTMLElement>) {
  const wrapperClassName = [style.content, className].filter(Boolean).join(' ')
  return <div className={wrapperClassName} {...others} />
}

export function Title({ className, ...others }: HTMLAttributes<HTMLElement>) {
  const wrapperClassName = [style.title, className].filter(Boolean).join(' ')
  return <h5 className={wrapperClassName} {...others} />
}

export function Desc({ className, ...others }: HTMLAttributes<HTMLElement>) {
  const wrapperClassName = [style.desc, className].filter(Boolean).join(' ')
  return <p className={wrapperClassName} {...others} />
}
