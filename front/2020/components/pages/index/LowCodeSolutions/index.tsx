/**
 * @file 基于低代码平台构建丰富的解决方案
 */

import React from 'react'

import { useMobile } from 'hooks/ua'
import Section from 'components/pages/index/Section'

import Pc from './Pc'
import Mobile from './Mobile'
import style from './style.less'

export default function Solutions() {
  const isMobile = useMobile()

  return (
    <Section title="基于低代码平台构建丰富的解决方案" rootClassName={style.root}>
      {
        isMobile ? <Mobile /> : <Pc />
      }
    </Section>
  )
}
