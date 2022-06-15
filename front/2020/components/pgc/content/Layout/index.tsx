/**
 * @file base layout
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { ReactNode, useState } from 'react'
import classNames from 'classnames'

import { ContentDetail, contentCategoryTextMap, Preview } from 'constants/pgc/content'
import { useIntersectionGlobalScrollingY } from 'hooks/scroll'
import { useViewportSize } from 'hooks/ua'

import { formateDate } from '../date-time'

import style from './style.less'

export interface BaseProps {
  contentDetail: ContentDetail
  createdAt?: number // 10 位 unix 时间戳
  preview?: Preview
}

export interface HeaderProps extends BaseProps {
  hasBackground?: boolean
  className?: string
}

// 简单的视差滚动动效 Parallax Scrolling Effect
function useParallaxScrolling(
  targetEle: HTMLElement | null,
  enabled: boolean,
  onScroll: (progress: number, targetEle: HTMLElement) => void
) {
  useIntersectionGlobalScrollingY(targetEle, (offset, target, viewport, ele) => {
    const start = target.top + viewport.top  // target 顶部与 viewport 顶部贴合
    const end = start + target.height        // target 底部与 viewport 顶部贴合
    offset -= viewport.height                // target 顶部被隐藏的高度
    const progress = offset / (end - start)  // target （从屏幕顶部开始）相对于自身高度所 scroll 的 percentage
    onScroll(Math.min(progress, 0.7), ele)   // 后半部分恢复为普通的跟随滚动效果
  }, enabled)
}

function useHeaderBackgroundStyle(url: string | undefined, headerBgEle: HTMLElement | null) {
  const viewportSize = useViewportSize()

  useParallaxScrolling(headerBgEle, !!url, (progress, ele) => {
    const [start, end] = [50, 100] // 上移 -> [居中 -> 到底]
    let pos = start + (end - start) * progress
    pos = Math.min(Math.max(pos, 0), end)
    ele.style.backgroundPositionY = `center, ${pos}%`
    ele.style.visibility = 'visible' // 避免首次渲染可能产生的抖动 TODO: 后续看一下要不要做性能优化
  })

  if (!url) {
    return {
      styleElement: null,
      className: undefined
    }
  }

  const className = 'pgc-content-header-bg'

  const backgroundImage = `url("${url}")`
  const backgroundMask = (
    'linear-gradient(180deg, rgba(0, 0, 0, 0) 42.29%, rgba(0, 0, 0, 0.492857) 72.42%, rgba(0, 0, 0, 0.75) 100%)'
  )
  const styleElement = (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: `
        .${className} {
          background-image: ${backgroundImage}; /* 兼容 IE 兜底 */
          background-image: ${backgroundMask}, ${backgroundImage};
        }
      ` }}
    ></style>
  )

  return {
    styleElement,
    className: `${style.hasBackground} ${className} ${viewportSize && viewportSize.width > 1920 ? style.lgLimit : ''}`
  }
}

export function Header({ contentDetail, createdAt, hasBackground = false, className }: HeaderProps) {
  const [headerBgEle, setHeaderBgEle] = useState<HTMLElement | null>(null)
  const headerBackgroundStyle = useHeaderBackgroundStyle(
    hasBackground ? contentDetail.posterUrl : undefined,
    headerBgEle
  )

  const [headerMainEle, setHeaderMainEle] = useState<HTMLElement | null>(null)
  useParallaxScrolling(headerMainEle, hasBackground, (progress, ele) => {
    const offset = 40
    ele.style.top = `${offset * progress}px`
  })

  return (
    <>
      {headerBackgroundStyle.styleElement}
      <header className={classNames(className, headerBackgroundStyle.className)} ref={setHeaderBgEle}>
        <div className={style.header} ref={setHeaderMainEle}>
          <h1 className={style.title}>{contentDetail.title}</h1>
          <dl className={style.meta}>
            <dt>类别：</dt>
            <dd>{contentCategoryTextMap[contentDetail.category]}</dd>
            <dt>发布时间：</dt>
            <dd>{formateDate(createdAt ?? Math.floor(Date.now() / 1e3))}</dd>
          </dl>
        </div>
      </header>
    </>
  )
}

export interface Props {
  className?: string
  preview?: Preview
  children: ReactNode
}

export default function Layout({ className, children }: Props) {
  return (
    <div className={classNames(style.layout, className)}>
      {children}
    </div>
  )
}
