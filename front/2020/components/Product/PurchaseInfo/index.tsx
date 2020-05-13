/**
 * @file 产品页购买/价格信息 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'

import Button from 'components/UI/Button'
import Section from 'components/Product/Section'
import classNames from 'classnames'
import { useMobile } from 'hooks/ua'

import styles from './style.less'

export interface IPurchaseInfoAction {
  url: string
}

export function PurchaseInfoActionForPc({ children, url }: PropsWithChildren<IPurchaseInfoAction>) {
  return <Button type="primary" href={url}>{children}</Button>
}

export function PurchaseInfoActionForMobile({ children, url }: PropsWithChildren<IPurchaseInfoAction>) {
  return <Button className={styles.btn} href={url}>{children}</Button>
}

export function PurchaseInfoAction(props: PropsWithChildren<IPurchaseInfoAction>) {
  const isMobile = useMobile()
  return isMobile ? <PurchaseInfoActionForMobile {...props} /> : <PurchaseInfoActionForPc {...props} />
}

export interface IPurchaseInfoItemProps {
  title: string
  desc: string
}

export function PurchaseInfoItem({ title, desc, children }: PropsWithChildren<IPurchaseInfoItemProps>) {
  return (
    <li className={styles.itemContainer}>
      <div className={styles.item}>
        <div className={styles.content}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.desc}>{desc}</p>
        </div>
        <span className={styles.action}>{children}</span>
      </div>
    </li>
  )
}

export interface IPurchaseInfoProps {
  title: string
  name: string
}

PurchaseInfo.defaultProps = {
  title: '产品优惠',
  name: 'purchase-info'
}

export default function PurchaseInfo({ children, name, title }: PropsWithChildren<IPurchaseInfoProps>) {
  const isMobile = useMobile()
  return (
    <Section name={name} title={title}>
      <ul className={classNames(styles.purchaseInfo, { [styles.mobile]: isMobile })}>
        {children}
      </ul>
    </Section>
  )
}
