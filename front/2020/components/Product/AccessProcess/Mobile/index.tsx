/**
 * @file 产品页面的“接入流程”组件 Mobile 端
 * @description 接入流程用本组件
 */

import React, { PropsWithChildren, Children, cloneElement } from 'react'

import { StepProps, AccessProcessProps } from '..'

import styles from './style.less'

interface StepTagProps {
  tag?: number
}

export function Step({ icon, url, tag, onClick, children }: PropsWithChildren<StepProps & StepTagProps>) {
  return (
    <div className={styles.step}>
      {
        tag && <div className={styles.tag}>{tag}</div>
      }
      {
        typeof icon === 'string'
          ? <img className={styles.stepIcon} src={icon} />
          : <div className={styles.stepIconContainer}>{React.cloneElement(icon as any, { width: '60px', height: '60px' })}</div>
      }
      {
        url && <a href={url} onClick={onClick} target="_blank" rel="noopener" className={styles.mask} />
      }
      <div onClick={onClick} className={styles.stepName}>{children}</div>
    </div>
  )
}

export function AccessProcess({
  children, subHeader
}: PropsWithChildren<AccessProcessProps>) {
  return (
    <div className={styles.accessProcess}>
      {subHeader && <div className={styles.subHeader}>{subHeader}</div>}
      <ul className={styles.process}>
        {Children.map(children, (child, idx) => child && cloneElement(child as any, { tag: idx + 1 }))}
      </ul>
    </div>
  )
}
