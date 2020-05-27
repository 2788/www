import React, { ReactNode } from 'react'
import classnames from 'classnames'

import { useMobile } from 'hooks/ua'
import { IPageBannerProps, defaultProps } from 'components/Product/PageBanner'
import styles from './style.less'

interface IndexPageBannerProps extends IPageBannerProps {
  bgImg: string
  className?: string
}

export default function IndexPageBanner(props: IndexPageBannerProps) {
  const { title, desc, bgColor = '#34A1EC', btns, icon, bgImg, className } = { ...defaultProps, ...props }
  const isMobile = useMobile()

  function renderBtnWrapper() {
    if (!btns || !btns.length) {
      return null
    }

    return (
      <div className={classnames(styles.btnsWrapper, className)}>
        {btns.map((btn: ReactNode, index: number) => (
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

    return <div className={styles.iconWrapper}>{icon}</div>
  }

  const bgStyle = {
    backgroundColor: bgColor,
    backgroundImage: bgImg ? `url(${bgImg})` : '',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }

  return (
    <div className={classnames(styles.mainWrapper, styles.index, className)} style={bgStyle}>
      <div className={classnames(styles.contentWrapper)}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.desc}>{desc}</div>
          {renderBtnWrapper()}
        </div>
        {renderIconWrapper()}
      </div>
    </div>
  )
}
