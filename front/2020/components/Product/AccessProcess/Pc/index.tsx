/**
 * @file 产品页面的“接入流程”组件 PC 端
 * @description 接入流程用本组件
 */

import React, { ReactNode, PropsWithChildren } from 'react'

import { StepProps, AccessProcessProps } from '..'

import styles from './style.less'

export function Step({ icon, url, children }: PropsWithChildren<StepProps>) {
  return (
    <li className={styles.step}>
      {
        typeof icon === 'string'
          ? <img className={styles.stepIcon} src={icon} />
          : icon
      }
      <div className={styles.stepName}>{children}</div>
      {
        url && <a href={url} target="_blank" rel="noopener" className={styles.mask} />
      }
    </li>
  )
}

function Connect() {
  return <i className={styles.connect} />
}

export function AccessProcess({
  children, subHeader
}: PropsWithChildren<AccessProcessProps>) {
  const stepNodes: ReactNode[] = []
  React.Children.forEach(children, (process, idx) => {
    if (idx !== 0) {
      stepNodes.push(<Connect key={idx} />)
    }
    stepNodes.push(process)
  })
  return (
    <div className={styles.accessProcess}>
      { subHeader && <div className={styles.subHeader}>{subHeader}</div> }
      <ul className={styles.process}>{stepNodes}</ul>
    </div>
  )
}
