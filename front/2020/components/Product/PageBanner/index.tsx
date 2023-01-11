/**
 * @file 产品页顶部 banner index.tsx
 * @description 包含简介、使用引导、icon 等
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { ReactNode, CSSProperties, useContext } from 'react'
import classnames from 'classnames'
import { headerThemeContext } from 'components/Header/Pc'

import { useMobile } from 'hooks/ua'

import styles from './style.less'

export interface IPageBannerProps {
  title: ReactNode
  desc?: ReactNode
  bgColor?: string
  btns?: ReactNode[]
  /** @deprecated 后面 icon 会删掉，全部替换成背景图 `bgImgUrl` 的方式 */
  icon?: ReactNode
  bgImgUrl?: string
}

export const defaultProps: Partial<IPageBannerProps> = {
  title: '七牛云',
  desc: '连接数据，重塑价值',
  btns: [],
  icon: null,
  bgImgUrl: ''
}

export default function PageBanner(props: IPageBannerProps) {
  const themeType = useContext(headerThemeContext)
  const light = themeType === 'light'
  const {
    title, desc, btns, icon, bgImgUrl,
    bgColor = (light ? '#B8DFFE' : '#213149')
  } = { ...defaultProps, ...props }
  const isMobile = useMobile()
  const isBtnsValid = btns && btns.length
  const pcBanner = bgImgUrl && !isMobile
  const mobileBanner = bgImgUrl && isMobile

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
    if (!icon || isMobile || bgImgUrl) {
      return null
    }

    if (typeof icon === 'string') {
      const styl: CSSProperties = {
        backgroundImage: `url("${icon}")`
      }
      return <div className={styles.iconWrapper} style={styl} />
    }

    return <div className={styles.iconWrapper}>{icon}</div>
  }

  const bgStyle = !bgImgUrl
    ? {
      backgroundColor: bgColor
    }
    : {
      backgroundImage: `url("${bgImgUrl}")`,
      backgroundPosition: isMobile ? 'right 0px center' : 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundColor: bgColor
    }

  return (
    <div className={styles.mainWrapper} style={bgStyle}>
      <div
        className={classnames(
          styles.contentWrapper,
          !isBtnsValid && styles.verticalCenter,
          pcBanner && styles.pcBanner,
          mobileBanner && styles.mobileBanner
        )}
      >
        <div className={classnames(styles.content, !isBtnsValid && styles.marginTopNone, light && styles.darkText)}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.desc}>{desc}</div>
          {renderBtnWrapper()}
        </div>
        {renderIconWrapper()}
      </div>
    </div>
  )
}
