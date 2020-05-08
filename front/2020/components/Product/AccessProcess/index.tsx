/**
 * @file 产品页面的“接入流程”组件
 * @description 接入流程用本组件
 */

import React, { ReactNode, ReactElement, PropsWithChildren } from 'react'
import ArrowIcon from './arrow.svg'

import styles from './style.less'

export interface StepProps {
  icon: ReactNode
}

export function Step({ icon, children }: PropsWithChildren<StepProps>) {
  return (
    <span className={styles.step}>
      {
        typeof icon === 'string'
          ? <img className={styles.stepIcon} src={icon} />
          : icon
      }
      <div className={styles.stepName} >{children}</div>
    </span>
  )
}

function Connect() {
  return <ArrowIcon className={styles.connect} />
}

export default function AccessProcess({ children }: PropsWithChildren<{}>) {
  const stepNodes: Array<ReactElement<typeof Connect> | ReactNode> = []
  React.Children.forEach(children, (process, idx) => {
    if (idx !== 0) {
      stepNodes.push(<Connect key={idx} />)
    }
    stepNodes.push(process)
  })
  return (
    <div className={styles.accessProcess}>
      {stepNodes}
    </div>
  )
}
