import React, { ReactNode, CSSProperties } from 'react'
import classnames from 'classnames'

import styles from './style.less'

interface IndexPageBannerProps {
  title?: ReactNode
  desc?: ReactNode
  bgColor?: string
  btns?: ReactNode[]
  bgImg: string
  className?: string
  href?: string
}

export default function IndexPageBanner(props: IndexPageBannerProps) {
  const { title, desc, bgColor = '#34A1EC', btns, bgImg, className, href } = props

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

  const bgColorStyle = {
    backgroundColor: bgColor
  }

  const bgStyle: CSSProperties = {
    backgroundImage: bgImg ? `url(${bgImg})` : '',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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
    </div>
  ))
}
