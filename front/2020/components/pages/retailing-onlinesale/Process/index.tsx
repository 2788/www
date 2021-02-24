import React from 'react'
import Section from 'components/Product/Section'

import ProcessIcon from './images/process.svg'
import style from './style.less'

export default function Process() {
  return (
    <Section name="process" title="业务流程">
      <ProcessIcon className={style.icon} />
    </Section>
  )
}
