/**
 * @file 云主机客户案例
 */

import React from 'react'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import { cb, zyd, zgpa, sfsy, shsp, zh, zx, qtfm } from 'constants/cases'
import { SectionProps } from 'components/Product/Section'

// qvm相关统一客户案例
export default function QvmCommonCases(props: Pick<SectionProps, 'header' | 'title'>) {
  return (
    <CustomerCaseGroup name="cases" {...props}>
      <CustomerCase pic={cb.logo} />
      <CustomerCase pic={zyd.logo} />
      <CustomerCase pic={zgpa.logo} />
      <CustomerCase pic={sfsy.logo} />
      <CustomerCase pic={shsp.logo} />
      <CustomerCase pic={zh.logo} />
      <CustomerCase pic={zx.logo} />
      <CustomerCase pic={qtfm.logo} />
    </CustomerCaseGroup>
  )
}
