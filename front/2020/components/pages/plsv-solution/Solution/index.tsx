/**
 * @file 短视频端到端解决方案 index.tsx
 * @description 包含短视频端到端解决方案
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { CSSProperties } from 'react'

import Section from 'components/Product/Section'

import { useMobile } from 'hooks/ua'

import Pc from './Pc'
import Mobile from './Mobile'

export default function PlsvSolution() {
  const isMobile = useMobile()
  const pcStyle: CSSProperties = {
    paddingBottom: 0
  }
  const mobileStyle: CSSProperties = {
    paddingLeft: 0,
    paddingRight: 0,
    ...pcStyle
  }

  function renderMain() {
    if (isMobile) {
      return <Mobile />
    }

    return <Pc />
  }

  return (
    <Section
      name="solution"
      title="解决方案"
      header="端到端的解决方案"
      subtitle="一站式短视频服务，让你专注核心业务创新"
      style={isMobile ? mobileStyle : pcStyle}
    >
      {renderMain()}
    </Section>
  )
}
