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

export default function CustomerCaseGroup({ children }: PropsWithChildren<{}>) {
  return (
    <Section title="客户案例" name="customer-cases">
      <ul className={styles.customerCaseGroup}>
        {children}
      </ul>
    </Section>
  )
}
