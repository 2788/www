/**
 * @file 云主机客户案例
 */

import React from 'react'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import { cb, zyd, zgpa, sfsy, shsp, zh, zx, qtfm } from 'constants/cases'

export default function QvmCases() {
  return (
    <CustomerCaseGroup header="他们都在用七牛">
      <QvmCommonCases />
    </CustomerCaseGroup>
  )
}

// qvm相关统一客户案例
export function QvmCommonCases() {
  return (
    <>
      <CustomerCase pic={cb.logo} />
      <CustomerCase pic={zyd.logo} />
      <CustomerCase pic={zgpa.logo} />
      <CustomerCase pic={sfsy.logo} />
      <CustomerCase pic={shsp.logo} />
      <CustomerCase pic={zh.logo} />
      <CustomerCase pic={zx.logo} />
      <CustomerCase pic={qtfm.logo} />
    </>
  )
}
