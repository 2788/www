import React, { Children, ReactNode, PropsWithChildren } from 'react'
import classnames from 'classnames'

import { useMobile } from 'hooks/ua'
import { IPageBannerProps, defaultProps } from 'components/Product/PageBanner'
import styles from 'components/Product/PageBanner/style.less'

type IndexPageBannerContentProps = IPageBannerProps

export function IndexPageBannerContent(props: IndexPageBannerContentProps) {
  const { title, desc, bgColor = '#34A1EC', btns, icon } = { ...defaultProps, ...props }
  const isMobile = useMobile()

  function renderBtnWrapper() {
    if (!btns || !btns.length) {
      return null
    }

    return (
      <div className={styles.btnsWrapper}>
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

  return (
    <div className={styles.contentWrapper} style={bgColorStyle}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.desc}>{desc}</div>
        {renderBtnWrapper()}
      </div>
      {renderIconWrapper()}
    </div>
  )
}

export type IndexPageBannerProps = PropsWithChildren<Pick<IPageBannerProps, 'bgColor'>>

export function IndexPageBanner({ children, bgColor }: IndexPageBannerProps) {
  const bgColorStyle = {
    backgroundColor: bgColor
  }
  Children.count(children)
  return (
    <div className={classnames(styles.mainWrapper, styles.index)} style={bgColorStyle}>
      {children}
    </div>
  )
}
