/**
 * @file 产品页顶部 banner index.tsx
 * @description 包含简介、使用引导、icon 等
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { ReactNode, CSSProperties } from 'react'
import classnames from 'classnames'

import { useMobile } from 'hooks/ua'

import styles from './style.less'

export interface IPageBannerProps {
  title: ReactNode
  desc?: ReactNode
  bgColor?: string
  btns?: ReactNode[]
  icon?: ReactNode
}

export const defaultProps: IPageBannerProps = {
  title: '七牛云',
  desc: '连接数据，重塑价值',
  bgColor: '#34A1EC',
  btns: [],
  icon: null
}

export default function PageBanner(props: IPageBannerProps) {
  const { title, desc, bgColor, btns, icon } = { ...defaultProps, ...props }
  const isMobile = useMobile()
  const isBtnsValid = btns && btns.length

  function renderBtnWrapper() {
    if (!isBtnsValid) {
      return null
    }

    return (
      <div className={styles.btnsWrapper}>
        {btns && btns.map((btn: ReactNode, index: number) => (
          <div className={styles.btn} key={index}>
            {btn}
          </div>
        ))}
      </div>
    )
  }

  function renderIconWrapper() {
    if (!icon || isMobile) {
      return null
    }

    if (typeof icon === 'string') {
      const styl: CSSProperties = {
        backgroundImage: `url(${icon})`
      }
      return <div className={styles.iconWrapper} style={styl} />
    }

    return <div className={styles.iconWrapper}>{icon}</div>
  }

  const bgColorStyle = {
    backgroundColor: bgColor
  }

  return (
    <div className={styles.mainWrapper} style={bgColorStyle}>
      <div className={classnames(styles.contentWrapper, !isBtnsValid && styles.verticalCenter)}>
        <div className={classnames(styles.content, !isBtnsValid && styles.marginTopNone)}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.desc}>{desc}</div>
          {renderBtnWrapper()}
        </div>
        {renderIconWrapper()}
      </div>
    </div>
  )
}
