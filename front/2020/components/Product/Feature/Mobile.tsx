/**
 * @file 产品页功能与优势组件 Mobile 端
 * @description 包含产品的功能、优势介绍
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { useState, useCallback, useContext, useEffect } from 'react'
import { context, LinkInfo } from './utils'

import {
  IFeatureItemProps, IFeatureLinkProps
} from '.'

import ArrowIcon from './arrow.svg'

import styles from './style.less'

export interface IMobileFeatureItemProps extends IFeatureItemProps {}

export interface IMobileFeatureLinkProps extends IFeatureLinkProps {}

export function MobileFeatureItem(props: IMobileFeatureItemProps) {
  const { icon, title, children } = props
  const [linkInfo, setLinkInfo] = useState<LinkInfo | null>(null)

  const register = useCallback((info: LinkInfo) => setLinkInfo(current => ({
    ...current,
    ...info
  })), [])

  function renderMain() {
    const href = linkInfo?.href

    if (!href) {
      return (
        <div
          className={styles.item}
        >
          <div className={styles.itemIcon}>{icon}</div>
          <div
            className={styles.itemContent}
          >
            <h3 className={styles.itemTitle}>{title}</h3>
            {children}
          </div>
        </div>
      )
    }

    return (
      <a className={styles.linkItem} href={href}>
        <div
          className={styles.item}
        >
          <div className={styles.itemIcon}>{icon}</div>
          <div
            className={styles.itemContent}
          >
            <h3 className={styles.itemTitle}>{title}</h3>
            {children}
          </div>
          <ArrowIcon className={styles.arrowIcon} />
        </div>
      </a>
    )
  }

  return (
    <context.Provider value={{ register }}>
      {renderMain()}
    </context.Provider>
  )
}

export function MobileFeatureLink(props: IMobileFeatureLinkProps) {
  const { href } = props
  const contextValue = useContext(context)

  // 将当前 link 信息向上注册
  const register = contextValue?.register
  useEffect(() => {
    if (!register) {
      return
    }

    register({
      href
    })
  }, [register, href])

  return null
}
