/**
 * @file 私有云存储客户案例 index.tsx
 * @description 包含私有云存储客户案例
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Section from 'components/Product/Section'

import Pc from './Pc'
import Mobile from './Mobile'

import { useMobile } from 'hooks/ua'

export default function PrivateCloudKodoCase() {
  const isMobile = useMobile()

  function renderMain() {
    if (isMobile) {
      return <Mobile />
    }

    return <Pc />
  }

  return (
    <Section name="case" title="客户案例">
      {renderMain()}
    </Section>
  )
}
