import React from 'react'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import { rmw, zgyd, zgpa, ys, jsws, huatai, lianying, baoxin } from 'constants/cases'

export default function Cases() {
  return (
    <CustomerCaseGroup name="cases" title="客户案例">
      <CustomerCase pic={rmw.logo} />
      <CustomerCase pic={zgyd.logo} />
      <CustomerCase pic={zgpa.logo} />
      <CustomerCase pic={ys.logo} />
      <CustomerCase pic={jsws.logo} />
      <CustomerCase pic={huatai.logo} />
      <CustomerCase pic={lianying.logo} />
      <CustomerCase pic={baoxin.logo} />
    </CustomerCaseGroup>
  )
}
