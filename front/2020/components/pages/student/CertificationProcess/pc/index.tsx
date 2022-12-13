/**
 * @file 校园开发者成长计划页面 - 学习中心 pc 端组件
 */

import React, { PropsWithChildren, ReactNode } from 'react'

import Link from 'components/Link'

import { StepProps } from '..'

import styles from './style.less'

export function Step({ url, iconUrl, children }: PropsWithChildren<StepProps>) {
  let content = (
    <div className={styles.content}>
      <span className={styles.arrowLeft} />
      <div className={styles.main}>
        <img className={styles.icon} src={iconUrl} alt={String(children)} />
        <span className={styles.text}>{children}</span>
      </div>
      <span className={styles.arrowRight}></span>
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
    <ul className={styles.process}>{children}</ul>
  )
}
