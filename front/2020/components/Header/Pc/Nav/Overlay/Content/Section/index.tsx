/**
 * @file          component ContentSection
 * @description   ContentSection 组件
 * @author        renpanpan
 */

import React, { MouseEvent, PropsWithChildren } from 'react'
import { chunk } from 'lodash'
import cls from 'classnames'
import Link from 'components/Link'
import Hot from 'components/Hot'
import style from './style.less'

type Props = PropsWithChildren<{
  title: string
  url?: string
  className?: string
  horizontal?: boolean // 是否为水平方向
  size?: number // 仅当 horizontal 为 true 时生效
}>

export default function ContentSection({ title, url, className, horizontal, size = 3, children }: Props) {
  const childrenArr = React.Children.toArray(children)
  if (horizontal) {
    // 不为size的倍数则补齐
    while (childrenArr.length % size !== 0) {
      childrenArr.push(<InvisibleItem key={childrenArr.length} />)
    }
  }
  const contentView = horizontal
    ? (
      <>
        {chunk(childrenArr, size).map((group, i) => (
          <div key={i} className={style.row}>{group}</div>
        ))}
      </>
    )
    : children
  return (
    <section className={cls(style.contentSection, className)}>
      {
        url !== undefined
          ? <div className={style.title}><Link href={url} className={style.link}>{title} &gt;</Link></div>
          : <div className={style.title}>{title}</div>
      }
      <ul className={style.list}>
        {contentView}
      </ul>
    </section>
  )
}

export type ItemProps = PropsWithChildren<{
  title?: string
  href: string
  hot?: boolean | string // 可能是"热门"之外的内容
  className?: string
  onClick?(e: MouseEvent): void
  target?: string // 有的站外链接但是需要当前页面打开而不是新页面，所以这边支持下 target
}>

export function ContentSectionItem({ title, href, hot, className, onClick, children }: ItemProps) {
  const hotIcon = hot && (typeof hot === 'boolean' ? <Hot className={style.hot} /> : <Hot text={hot} className={style.hot} />)
  const contentView = title
    ? (
      <>
        <div className={style.title}>
          {title}
          {hotIcon}
        </div>
        {children}
      </>
    )
    : <>{children}{hotIcon}</>
  return (
    <li className={style.item}>
      <Link href={href} onClick={onClick} className={cls(style.link, className)}>
        {contentView}
      </Link>
    </li>
  )
}

export function InvisibleItem() {
  return <section className={cls(style.item, style.invisible)} />
}
