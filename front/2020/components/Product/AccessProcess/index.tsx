/**
 * @file 产品页面的“接入流程”组件
 * @description 接入流程用本组件
 */

import React, { ReactNode, ReactElement, PropsWithChildren } from 'react'
import Section from '../Section'
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
      <div className={styles.stepName}>{children}</div>
    </span>
  )
}

function Connect() {
  return <ArrowIcon className={styles.connect} />
}

export type Props = PropsWithChildren<{
  name?: string
  title?: string
}>

export default function AccessProcess({
  name = 'access',
  title = '接入流程',
  children
}: Props) {
  const stepNodes: Array<ReactElement<typeof Connect> | ReactNode> = []
  React.Children.forEach(children, (process, idx) => {
    if (idx !== 0) {
      stepNodes.push(<Connect key={idx} />)
    }
    stepNodes.push(process)
  })
  return (
    <Section name={name} title={title}>
      <div className={styles.accessProcess}>
        {stepNodes}
      </div>
    </Section>
  )
}
