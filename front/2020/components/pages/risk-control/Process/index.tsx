import React from 'react'
import Section from 'components/Product/Section'
import { RawAccessProcess as AccessProcess, Step } from 'components/Product/AccessProcess'
import Link from 'components/Link'

import Step1 from './images/01.svg'
import Step2 from './images/02.svg'
import Step3 from './images/03.svg'
import Step4 from './images/04.svg'

export default function Process() {

  return (
    <Section name="access" title="接入流程">
      <AccessProcess>
        <Step icon={<Step1 />}>
          <div style={{ marginBottom: 4 }}>合作申请</div>
          <Link blue href="https://jinshuju.net/f/cwtofb">点此提交</Link>
        </Step>
        <Step icon={<Step2 />}>资质审核</Step>
        <Step icon={<Step3 />}>POC 测试</Step>
        <Step icon={<Step4 />}>正式使用</Step>
      </AccessProcess>
    </Section>
  )
}
