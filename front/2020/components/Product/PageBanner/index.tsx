/**
 * @file 产品页顶部 banner index.tsx
 * @description 包含简介、使用引导、icon 等
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { ReactNode } from 'react'

import { useMobile } from '../../../hooks/ua'

import styles from './style.less'

export interface IPageBannerProps {
  title: ReactNode
  desc?: ReactNode
  bgColor?: string
  btns?: ReactNode[]
  icon?: ReactNode
}

const defaultProps: IPageBannerProps = {
  title: '七牛云',
  desc: '连接数据，重塑价值',
  bgColor: '',
  btns: [],
  icon: null
}

export default function PageBanner(props: IPageBannerProps) {
  const { title, desc, bgColor, btns, icon } = { ...defaultProps, ...props }
  const isMobile = useMobile()

  function renderBtnWrapper() {
    if (!btns || !btns.length) {
      return null
    }

    return (
      <div className={styles.btnsWrapper}>{
        btns.map((btn: ReactNode, index: number) => {
          return (
            <div
              className={styles.btn}
              key={index}>
              {btn}
            </div>
          )
        })}
      </div>
    )
  }

  function renderIconWrapper() {
    if (!icon || isMobile) {
      return null
    }

    return (
      <div className={styles.iconWrapper}>
        {icon}
      </div>
    )
  }

  const bgColorStyle = {
    backgroundColor: bgColor
  }

  return (
    <div className={styles.mainWrapper} style={bgColorStyle}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.desc}>{desc}</p>
          {renderBtnWrapper()}
        </div>
        {renderIconWrapper()}
      </div>
    </div>
  )
}
