/**
 * @file 图标库图标预览
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import classNames from 'classnames'

import { IconFile, iconConfig } from 'constants/icon'
import ImgPreview from 'components/common/ImgPreview'

import SvgIconPreview, { SvgIconPreviewNano } from './SvgIconPreview'

import styles from './style.m.less'

export interface Props {
  icon: IconFile
  className?: string
}

export default function IconPreview({ icon, className }: Props) {
  if (icon.type === 'svg-inline') {
    return (<SvgIconPreview svg={icon.content} className={className} />)
  }

  if (icon.type === 'url') {
    return (
      <ImgPreview
        url={icon.url}
        type="contain"
        width={iconConfig.width}
        height={iconConfig.height}
        className={classNames(styles.icon, className)}
      />
    )
  }

  return null
}

export function IconPreviewNano({ icon, className }: Props) {
  if (icon.type === 'svg-inline') {
    return (<SvgIconPreviewNano svg={icon.content} className={className} />)
  }

  if (icon.type === 'url') {
    return (
      <span className={classNames(styles.iconNano, className)}>
        <img src={icon.url} alt="preview" />
      </span>
    )
  }

  return null
}
