import React, { CSSProperties } from 'react'
import classnames from 'classnames'
import { Tooltip } from 'react-icecream-2'

import Link from 'components/Link'

import styles from './index.less'

export type Props = {
  name: string
  url: string
  tooltipTitle: string
  tooltipDesc: string
  tooltipPlacement?: 'right' | 'top'
  centerContent?: boolean
  // 是否不带缺角边框
  noBorder?: boolean
  style?: CSSProperties
}
export default function Text({ name, url, tooltipTitle, tooltipDesc, noBorder, tooltipPlacement = 'right', centerContent = false, style }: Props) {
  const title = (
    <>
      <div className={styles.title}>{tooltipTitle}</div>
      <p className={styles.desc}>{tooltipDesc}</p>
    </>
  )
  // TODO tooltip 不支持 className，修下
  const workaroundForTooltipClassName = { overlayClassName: styles.tooltip }
  return (
    <Tooltip title={title} placement={tooltipPlacement} {...workaroundForTooltipClassName}>
      <Link className={classnames(styles.text, noBorder && styles.noBorder)} href={url} style={{ justifyContent: centerContent ? 'center' : 'space-between', ...style }}>
        <span>{name}</span>
        <span className={styles.arrow}>
          <svg width="6" height="6" viewBox="0 0 4 6">
            <path fillRule="evenodd" clipRule="evenodd" d="M4 3L0 0L0 6L4 3Z" fill="currentColor" />
          </svg>
        </span>
        {!noBorder && <Angle />}
      </Link>
    </Tooltip>
  )
}

function Angle() {
  return (
    <svg width="11" height="32" viewBox="0 0 11 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.angle}>
      <path d="M0 0V0C1.41397 0 2.71477 0.773108 3.39058 2.01512L10.4799 15.0441C10.8042 15.6401 10.8042 16.3599 10.4799 16.9559L3.39058 29.9849C2.71478 31.2269 1.41397 32 0 32V32V0Z" fill="currentColor" />
    </svg>
  )
}
