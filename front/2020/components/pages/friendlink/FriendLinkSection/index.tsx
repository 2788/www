/**
 * @file: 标题、内容居中的展示块
 */

import React, { PropsWithChildren } from 'react'

import style from './style.less'

export interface IFriendLinkSectionProps {
  title: string
}

export default function FriendLinkSection({ title, children }: PropsWithChildren<IFriendLinkSectionProps>) {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>{title}</div>
      {children}
    </div>
  )
}

