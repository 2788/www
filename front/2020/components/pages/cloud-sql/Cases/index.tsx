import React from 'react'
import CustomerCaseGroup from 'components/Product/CustomerCaseGroup'
import { QvmCommonCases } from 'components/pages/qvm/Cases'

export default function Cases() {
  return (
    <CustomerCaseGroup title="客户案例" name="cases">
      <QvmCommonCases />
    </CustomerCaseGroup>
  )
}
