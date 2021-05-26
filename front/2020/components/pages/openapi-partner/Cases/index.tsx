import React from 'react'
import { SectionProps } from 'components/Product/Section'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'

import sm from './images/sm.png'
import spkj from './images/spkj.png'
import aly from './images/aly.png'
import dgsj from './images/dgsj.png'
import yitu from './images/yitu.png'
import mkl from './images/mkl.png'

export default function Cases(props: Omit<SectionProps, 'name' | 'title' | 'children'>) {
  return (
    <CustomerCaseGroup name="cases" title="合作伙伴" {...props}>
      <CustomerCase pic={sm} />
      <CustomerCase pic={spkj} />
      <CustomerCase pic={aly} />
      <CustomerCase pic={dgsj} />
      <CustomerCase pic={yitu} />
      <CustomerCase pic={mkl} />
    </CustomerCaseGroup>
  )
}
