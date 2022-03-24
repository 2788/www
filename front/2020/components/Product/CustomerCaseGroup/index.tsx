/**
 * @file 产品页客户案例 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { createContext, PropsWithChildren, ReactNode, useContext } from 'react'

import Section, { SectionProps } from 'components/Product/Section'
import classNames from 'classnames'
import { useMobile } from 'hooks/ua'

import styles from './style.less'

export interface ICustomerCaseProps {
  pic: ReactNode
  alt?: string
}

const sizeCtx = createContext(4)

export function CustomerCase({ pic, ...otherProps }: PropsWithChildren<ICustomerCaseProps>) {
  const size = useContext(sizeCtx)
  const isMobile = useMobile()
  const minWidth = isMobile ? undefined : Math.max(100 / size, 25) + '%'
  const style = {
    minWidth
  }
  return (
    <li className={styles.caseContainer} style={style}>
      <div className={styles.case}>
        {
          typeof pic === 'string'
            ? <img className={styles.pic} src={pic} {...otherProps} />
            : pic
        }
      </div>
    </li>
  )
}

export function RawCustomerCaseGroup({ children }: PropsWithChildren<{}>) {
  const isMobile = useMobile()
  const childrenArr = React.Children.toArray(children)
  return (
    <ul className={classNames(styles.customerCaseGroup, { [styles.mobile]: isMobile })}>
      <sizeCtx.Provider value={childrenArr.length}>
        {children}
      </sizeCtx.Provider>
    </ul>
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
  return (
    <Section {...sectionProps}>
      <RawCustomerCaseGroup>{children}</RawCustomerCaseGroup>
    </Section>
  )
}
