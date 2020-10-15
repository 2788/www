import React from 'react'
import { CustomerCase, RawCustomerCaseGroup } from 'components/Product/CustomerCaseGroup'
import Section from 'components/Product/Section'

import changba from './images/changba.png'
import yidong from './images/yidong.png'
import pingan from './images/pingan.png'
import shunfeng from './images/shunfeng.png'
import sohu from './images/sohu.png'
import zhihu from './images/zhihu.png'
import zhongxing from './images/zhongxing.png'
import qingtingfm from './images/qingtingfm.png'

export default function KodoCase() {
  return (
    <Section title="客户案例" name="cases">
      <RawCustomerCaseGroup>
        <CustomerCase pic={changba} />
        <CustomerCase pic={yidong} />
        <CustomerCase pic={pingan} />
        <CustomerCase pic={shunfeng} />
        <CustomerCase pic={sohu} />
        <CustomerCase pic={zhihu} />
        <CustomerCase pic={zhongxing} />
        <CustomerCase pic={qingtingfm} />
      </RawCustomerCaseGroup>
    </Section>
  )
}
