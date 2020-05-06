/**
 * @file 产品页活动与公告组件 index.tsx
 * @description 包含活动、公告等
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { ReactNode, HTMLAttributes } from 'react'

import NewsIcon from './images/news.svg'
import WelfaresIcon from './images/welfares.svg'

import styles from './style.less'

export type GroupType = 'news' | 'welfares'

export interface INoticeItemProps extends HTMLAttributes<HTMLElement> {
  href: string
  children: ReactNode
  title?: string
}

export interface INoticeGroupProps extends HTMLAttributes<HTMLElement> {
  title: string
  type: GroupType
  children: ReactNode
}

// list: 渲染的数据，可不传，没有数据则不渲染组件
export interface IPageNoticeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export default function PageNotice(props: IPageNoticeProps) {
  const { children } = props

  if (!children) {
    return null
  }

  const className = [
    props.className,
    styles.mainWrapper
  ].filter(Boolean).join(' ')

  return (
    <div className={className}>
      <div className={styles.noticeWrapper}>
        {children}
      </div>
    </div>
  )
}

export function Group(props: INoticeGroupProps) {
  const { title, type, children } = props

  function renderTitleIconByType(type: GroupType) {
    switch (type) {
      case 'news':
        return <NewsIcon className={styles.titleIcon} />
      case 'welfares':
        return <WelfaresIcon className={styles.titleIcon} />
      default:
        // 默认返回小喇叭 icon
        return <NewsIcon className={styles.titleIcon} />
    }
  }

  const className = [
    props.className,
    styles.noticeGroup
  ].filter(Boolean).join(' ')

  return (
    <div className={className}>
      <p className={styles.title}>
        {renderTitleIconByType(type)}{title}
      </p>
      {children}
    </div>
  )
}

export function Item(props: INoticeItemProps) {
  const { title, href, children } = props

  const className = [
    props.className,
    styles.noticeItem
  ].filter(Boolean).join(' ')

  return (
    <p className={className}>
      <a
        className={styles.notice}
        {...title && { title }}
        href={href}>
        {children}
      </a>
    </p>
  )
}
