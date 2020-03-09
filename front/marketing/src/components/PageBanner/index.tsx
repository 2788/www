/**
 * @file Production Mode of PageBanner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import { ComponentName, IComponentInfo } from 'apis/component'

// TODO: css module 有问题
// import * as style from './style.m.less'
import './style.less'

export interface IConfig {
  src: string
  title: string
  alt: string
  link: string
}

export interface IProps {
  info: IComponentInfo<ComponentName.PageBanner>
}

export default observer(function PageBanner({ info }: IProps) {
  const { link, title, src, alt } = info.data
  return (
    <a href={link} title={title} className="page-banner-wrapper">
      <img src={src} alt={alt || 'header image'} />
    </a>
  )
})
