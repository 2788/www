/**
 * @file 私有云存储客户案例 index.tsx
 * @description 包含私有云存储客户案例
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { CSSProperties } from 'react'

import Section from 'components/Product/Section'

import { useMobile } from 'hooks/ua'

import Pc from './Pc'
import Mobile from './Mobile'

export default function KodoeCase() {
  const isMobile = useMobile()
  const mobileStyle: CSSProperties = {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  }

  function renderMain() {
    if (isMobile) {
      return <Mobile />
    }

    return <Pc sectionName="case" />
  }

  return (
    <Section
      name="case"
      title="客户案例"
      style={isMobile ? mobileStyle : {}}
    >
      {renderMain()}
    </Section>
  )
}
