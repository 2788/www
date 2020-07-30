import React from 'react'
import Section from 'components/Product/Section'
import { CustomerCase, RawCustomerCaseGroup } from 'components/Product/CustomerCaseGroup'

import jumei from './images/jumei.png'
import dj from './images/dj.png'
import blued from './images/blued.png'
import liulishuo from './images/liulishuo.png'
import changba from './images/changba.png'
import hupu from './images/hupu.png'
import fangdd from './images/fangdd.png'
import xiaohongshu from './images/xiaohongshu.png'

export default function Case() {
  return (
    <Section title="客户案例" name="case" withTailPadding>
      <RawCustomerCaseGroup>
        <CustomerCase pic={jumei} />
        <CustomerCase pic={dj} />
        <CustomerCase pic={blued} />
        <CustomerCase pic={liulishuo} />
        <CustomerCase pic={changba} />
        <CustomerCase pic={hupu} />
        <CustomerCase pic={fangdd} />
        <CustomerCase pic={xiaohongshu} />
      </RawCustomerCaseGroup>
    </Section>
  )
}
