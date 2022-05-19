/**
 * @file base layout
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { ReactNode } from 'react'
import classNames from 'classnames'

import { ContentDetail, contentCategoryTextMap, Preview } from 'constants/pgc/content'

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

function useHeaderBackgroundStyle(url: string | undefined) {
  if (!url) {
    return {
      styleElement: null,
      className: undefined
    }
  }

  const className = 'pgc-content-header-bg'

  const backgroundImage = `url(${url})`
  const backgroundMask = (
    'linear-gradient(180deg, rgba(0, 0, 0, 0) 42.29%, rgba(0, 0, 0, 0.492857) 72.42%, rgba(0, 0, 0, 0.75) 100%)'
  )
  const styleElement = (
    <style>
      {`
        .${className} {
          /* 前面用作兼容 IE 的兜底 */
          background-position: center;
          background-size: cover;
          background-image: ${backgroundImage};
          /* 最后才是完整效果 */
          background: ${backgroundMask}, center/cover ${backgroundImage};
        }
      `}
    </style>
  )

  return {
    styleElement,
    className: `${style.hasBackground} ${className}`
  }
}

export function Header({ contentDetail, createdAt, hasBackground, className }: HeaderProps) {
  const headerBackgroundStyle = useHeaderBackgroundStyle(hasBackground ? contentDetail.posterUrl : undefined)
  return (
    <>
      {headerBackgroundStyle.styleElement}
      <header className={classNames(className, headerBackgroundStyle.className)}>
        <div className={style.header}>
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
