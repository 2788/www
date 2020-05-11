/**
 * @file 产品页客户案例 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren, ReactNode } from 'react'

import Section from 'components/Product/Section'

import styles from './style.less'

export interface ICustomerCaseProps {
  pic: ReactNode
}

export function CustomerCase({ pic }: PropsWithChildren<ICustomerCaseProps>) {
  return (
    <li className={styles.caseContainer}>
      <div className={styles.case}>
        {
          typeof pic === 'string'
            ? <img className={styles.pic} src={pic} />
            : pic
        }
      </div>
    </li>
  )
}

export type Props = PropsWithChildren<{
  name?: string
  title?: string
}>

export default function CustomerCaseGroup({
  name = 'customer-cases',
  title = '客户案例',
  children
}: Props) {
  return (
    <Section title={title} name={name}>
      <ul className={styles.customerCaseGroup}>
        {children}
      </ul>
    </Section>
  )
}
