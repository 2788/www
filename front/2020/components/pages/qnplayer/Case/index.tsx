/**
 * @file: 播放器 SDK —— 客户案例
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import { blue, qczj, cy, mtime } from 'constants/cases'

export default function QnPlayerCase() {
  return (
    <CustomerCaseGroup name="cases" title="客户案例">
      <CustomerCase pic={blue.logo} />
      <CustomerCase pic={mtime.logo} />
      <CustomerCase pic={cy.logo} />
      <CustomerCase pic={qczj.logo} />
    </CustomerCaseGroup>
  )
}
