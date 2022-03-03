import React from 'react'
import Section from 'components/Product/Section'
import Arch from './images/architecture.svg'
import style from './index.less'

export default function Architecture() {
  return (
    <Section name="architecture" title="方案架构">
      <Arch className={style.icon} />
    </Section>
  )
}
