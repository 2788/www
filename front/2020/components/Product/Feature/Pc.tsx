/**
 * @file 产品页功能与优势组件 Pc 端
 * @description 包含产品的功能、优势介绍
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import classnames from 'classnames'

import {
  IFeatureItemProps, IFeatureLinkProps,
  PosType, AlignType
} from '.'

import styles from './style.less'

export interface IPcFeatureItemProps extends IFeatureItemProps {}

export interface IPcFeatureLinkProps extends IFeatureLinkProps {}

export function PcPlaceholder() {
  return (
    <div className={styles.item}></div>
  )
}

export function PcFeatureItem(props: IPcFeatureItemProps) {
  const { icon, title, children, pos, align } = props

  function getClassByPosType(posType: PosType) {
    switch (posType) {
      case 'top-down':
        return styles.itemTopDown
      case 'left-right':
        return styles.itemLeftRight
      default:
        return styles.itemTopDown
    }
  }

  function getClassByAlignType(alignType: AlignType) {
    switch (alignType) {
      case 'center':
        return styles.contentCenter
      case 'left':
        return styles.contentLeft
      case 'justify':
        return styles.contentJustify
      default:
        return styles.contentCenter
    }
  }

  return (
    <div className={classnames(styles.item, getClassByPosType(pos))}>
      <div className={styles.itemIcon}>{icon}</div>
      <div className={classnames(styles.itemContent, getClassByAlignType(align))}>
        <h3 className={styles.itemTitle}>{title}</h3>
        {children}
      </div>
    </div>
  )
}

export function PcFeatureLink(props: IPcFeatureLinkProps) {
  const { href, children } = props

  // 用 <object> 包住 <a> 标签是用于阻断 <a> 标签嵌套检测
  // https://blog.csdn.net/qq_34973481/article/details/88948994
  // 这个方法比较邪性，也不知道后续会产生什么负面影响
  // 先记一下，后面再看有没有更优雅的解决方法
  return (
    <object><a href={href}>{children}</a></object>
  )
}
