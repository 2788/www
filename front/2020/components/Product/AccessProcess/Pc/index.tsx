/**
 * @file 产品页面的“接入流程”组件 PC 端
 * @description 接入流程用本组件
 */

import React, { ReactNode, PropsWithChildren } from 'react'

import { StepProps, AccessProcessProps } from '..'

import styles from './style.less'

export function Step({ icon, url, onClick, children }: PropsWithChildren<StepProps>) {
  const iconView = (
    typeof icon === 'string'
    ? <img className={styles.stepIcon} src={icon} />
    : <div className={styles.stepIconWrapper}>{icon}</div>
  )
  let content = (
    <>
      {iconView}
      <div onClick={onClick} className={styles.stepName}>{children}</div>
    </>
  )
  if (url != null) {
    content = <a href={url} target="_blank" rel="noopener">{content}</a>
  }
  return (
    <li className={styles.step}>
      {content}
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
      {subHeader && <div className={styles.subHeader}>{subHeader}</div>}
      <ul className={styles.process}>{stepNodes}</ul>
    </div>
  )
}
