import React, { ReactNode } from 'react'
import classnames from 'classnames'

import { useMobile } from 'hooks/ua'
import styles from './style.less'

interface IndexPageBannerProps {
  title?: ReactNode
  desc?: ReactNode
  bgColor?: string
  btns?: ReactNode[]
  icon?: ReactNode
  bgImg: string
  className?: string
  href?: string
}

export default function IndexPageBanner(props: IndexPageBannerProps) {
  const { title, desc, bgColor = '#34A1EC', btns, icon, bgImg, className, href } = props
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

  const bgColorStyle = {
    backgroundColor: bgColor
  }

  const bgStyle = {
    backgroundImage: bgImg ? `url(${bgImg})` : '',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }

  const wrapperTag = href != null ? 'a' : 'div'

  return React.createElement(wrapperTag, {
    className: classnames(styles.mainWrapper, styles.index, className),
    style: bgColorStyle,
    href
  }, (
    <div className={classnames(styles.contentWrapper)} style={bgStyle}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.desc}>{desc}</div>
        {renderBtnWrapper()}
      </div>
      {renderIconWrapper()}
    </div>
  ))
}
