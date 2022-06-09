/* eslint-disable react/no-danger */
import React, { CSSProperties, ReactNode } from 'react'
import classnames from 'classnames'
import Link from 'components/Link'
import Button from 'components/UI/Button'
import { useMobile } from 'hooks/ua'
import { HomePageBanner, AdvertInfo } from 'apis/thallo'
import { trackClick as trackThalloClick } from 'utils/sensors/thallo'

import styles from './style.less'

export interface Props extends AdvertInfo<HomePageBanner> {
  dark: boolean
}

export default function IndexPageBanner({ dark, ...advertInfo }: Props) {
  const { pPic, txt, subTxt, url, bTxt, mPic } = advertInfo.elements
  const isMobile = useMobile()
  const bgImg = isMobile ? mPic.value : pPic.value
  const backgroundColor = pPic.imgColorFill

  function renderBtnWrapper() {
    if (isMobile || !bTxt.value) {
      return null
    }
    return (
      <div className={styles.btnsWrapper}>
        <Button
          className={styles.btn}
          type={dark ? 'default' : 'hollow'}
          style={dark ? { color: backgroundColor } : undefined}
          withBorder={!dark}
        >{bTxt.value}</Button>
      </div>
    )
  }
  const bgColorStyle = { backgroundColor }

  const bgStyle: CSSProperties = {
    backgroundImage: `url("${bgImg}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }

  function withWrapper(children: ReactNode) {
    const href = url.value
    const handleClick = () => {
      trackThalloClick(advertInfo)
    }
    const props = {
      className: classnames(styles.mainWrapper, styles.index),
      style: bgColorStyle,
      onClick: handleClick,
      children
    }
    if (!href) {
      return <div {...props} />
    }
    return <Link {...props} href={href} />
  }

  const title = txt.value
  const desc = subTxt.value

  return withWrapper(
    <div className={styles.contentWrapper} style={bgStyle}>
      <div className={classnames(styles.content, dark ? styles.dark : styles.light)}>
        {title && <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />}
        {desc && <p className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />}
        {renderBtnWrapper()}
      </div>
    </div>
  )
}
