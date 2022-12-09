/**
 * @file 校园开发者成长计划页面 - 学习中心移动端组件
 */

import React, { PropsWithChildren, ReactNode } from 'react'

import Link from 'components/Link'

import { StepProps } from '..'
import No1Icon from '../images/1.svg'
import No2Icon from '../images/2.svg'
import No3Icon from '../images/3.svg'
import No4Icon from '../images/4.svg'
import No5Icon from '../images/5.svg'

import styles from './style.less'

const NumberIcons = [No1Icon, No2Icon, No3Icon, No4Icon, No5Icon]

export function Step({ icon, url, children, number }: PropsWithChildren<StepProps>) {
  const StepNumber = number ? NumberIcons[number - 1] : null

  let content = (
    <div className={styles.content}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.text}>{children}</div>
      <div className={styles.numberIcon}>
        {StepNumber && <StepNumber />}
      </div>
    </div>
  )

  if (url != null) {
    content = <Link href={url}>{content}</Link>
  }

  return (
    <li className={styles.step}>
      {content}
    </li>
  )
}

export function CertificationProcess({ children }: { children: ReactNode }) {
  return (
    <ol className={styles.wrapper}>
      {children}
    </ol>
  )
}
