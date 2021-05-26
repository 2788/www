import React from 'react'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import { SectionProps } from 'components/Product/Section'
import { blue, lls, xhs, mkl } from 'constants/cases'

export default function Cases(props: Omit<SectionProps, 'name' | 'title' | 'children'>) {
  return (
    <CustomerCaseGroup name="cases" title="客户案例" {...props}>
      <CustomerCase pic={blue.logo} />
      <CustomerCase pic={lls.logo} />
      <CustomerCase pic={xhs.logo} />
      <CustomerCase pic={mkl.logo} />
    </CustomerCaseGroup>
  )
}
