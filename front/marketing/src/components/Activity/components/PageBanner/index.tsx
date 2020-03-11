/**
 * @file Production Mode of PageBanner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { forwardRef, Ref } from 'react'
import { observer } from 'mobx-react'

import { ComponentName, IComponentInfo } from 'apis/component'
import { IBaseProps } from '../..'

import * as styles from './style.m.less'

export interface IConfig {
  src: string // 图片 src 地址
  title?: string // 图片 title
  alt?: string // 图片 alt

  link?: string // 点击落地页 banner 跳转的链接地址
  target?: string // 链接 target 属性（该字段为预留字段）
  rel?: string // 链接 rel 属性（该字段为预留字段）
}

export interface IProps extends IBaseProps {
  info: IComponentInfo<ComponentName.PageBanner>
}

export default observer(forwardRef(function PageBanner({ info: { data } }: IProps, ref: Ref<any>) {
  const { link, title, src, alt } = data

  const imgView = (
    <img
      src={src}
      alt={alt || 'header image'}
      {...title && { title }}
      className={styles.img}
    />
  )

  if (!link) {
    return (
      <div className={styles.normalWrapper} ref={ref}>
        {imgView}
      </div>
    )
  }

  const target = data.target || '_blank'
  const rel = data.rel && target === '_blank' && 'noopener' // TODO: noreferrer external nofollow ?

  return (
    <a
      href={link}
      target={target}
      {...rel && { rel }}
      className={styles.linkWrapper}
      ref={ref}
    >
      {imgView}
    </a>
  )
}))
