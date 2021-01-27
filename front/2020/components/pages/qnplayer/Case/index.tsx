/**
 * @file: 播放器 SDK —— 客户案例
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import { blue, xhs, qczj, cy, mtime, maimai } from 'constants/cases'

export default function QnPlayerCase() {
  return (
    <CustomerCaseGroup name="cases" title="客户案例">
      <CustomerCase pic={blue.logo} />
      <CustomerCase pic={mtime.logo} />
      <CustomerCase pic={cy.logo} />
      <CustomerCase pic={maimai.logo} />
      <CustomerCase pic={qczj.logo} />
      <CustomerCase pic={xhs.logo} />
    </CustomerCaseGroup>
  )
}
