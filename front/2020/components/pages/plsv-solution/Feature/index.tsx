/**
 * @file 短视频特色功能 index.tsx
 * @description 包含短视频特色功能
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { CSSProperties } from 'react'

import Section from 'components/Product/Section'

import { useMobile } from 'hooks/ua'

import Pc from './Pc'
import Mobile from './Mobile'

export default function PlsvFeature() {
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
      name="feature"
      title="特色功能"
      style={isMobile ? mobileStyle : pcStyle}
    >
      {renderMain()}
    </Section>
  )
}
