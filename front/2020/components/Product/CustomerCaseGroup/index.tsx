/**
 * @file 产品页客户案例 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren, ReactNode } from 'react'

import Section, { SectionProps } from 'components/Product/Section'
import classNames from 'classnames'
import { useMobile } from 'hooks/ua'

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

CustomerCaseGroup.defaultProps = {
  name: 'customer-cases',
  title: '客户案例'
}

export default function CustomerCaseGroup({
  children,
  ...sectionProps
}: PropsWithChildren<SectionProps>) {
  const isMobile = useMobile()
  return (
    <Section {...sectionProps}>
      <ul className={classNames(styles.customerCaseGroup, { [styles.mobile]: isMobile })}>
        {children}
      </ul>
    </Section>
  )
}
