/**
 * @file Production Mode of PageBanner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import { ComponentName, IComponentInfo } from 'apis/component'
import { IBaseProps } from 'components/common/Renderer'

import * as styles from './style.m.less'

export interface IConfig {
  src: string
  title: string
  alt: string
  link: string
}

export interface IProps extends IBaseProps {
  info: IComponentInfo<ComponentName.PageBanner>
}

export default observer(function PageBanner({ info }: IProps) {
  const { link, title, src, alt } = info.data
  return (
    <a href={link} title={title} className={styles.mainWrapper}>
      <img src={src} alt={alt || 'header image'} />
    </a>
  )
})
