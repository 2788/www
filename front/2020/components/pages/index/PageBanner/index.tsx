/* eslint-disable react/no-danger */
import React, { CSSProperties, ReactNode } from 'react'
import classnames from 'classnames'
import Link from 'components/Link'
import Button from 'components/UI/Button'
import { useMobile } from 'hooks/ua'
import { Banner } from 'apis/admin/homepage'

import styles from './style.less'

export default function IndexPageBanner({ dark, ...banner }: Banner & { dark: boolean }) {
  const { title, desc, backgroundColor = '#34A1EC', href, pcImg, mobileImg, buttonTexts } = banner
  const isMobile = useMobile()
  const bgImg = isMobile ? mobileImg : pcImg

  function renderBtnWrapper() {
    if (isMobile || !buttonTexts || !buttonTexts.length) {
      return null
    }
    return (
      <div className={styles.btnsWrapper}>
        {
          buttonTexts.map((text, index) => (
            index === 0
              ? <Button key={index} type="primary" className={styles.btn}>{text}</Button>
              : <Button key={index} type="hollow" className={classnames(styles.btn, styles.hollow)} withBorder>{text}</Button>
          ))
        }
      </div>
    )
  }
  const bgColorStyle = { backgroundColor }

  const bgStyle: CSSProperties = {
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }

  function withWrapper(children: ReactNode) {
    const props = {
      className: classnames(styles.mainWrapper, styles.index),
      style: bgColorStyle,
      children
    }
    if (href == null) {
      return <div {...props} />
    }
    return <Link {...props} href={href} />
  }

  return withWrapper(
    <div className={styles.contentWrapper} style={bgStyle}>
      <div className={classnames(styles.content, dark && styles.dark)}>
        {title && <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />}
        {desc && <p className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />}
        {renderBtnWrapper()}
      </div>
    </div>
  )
}
