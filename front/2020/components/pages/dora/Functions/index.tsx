/**
 * @file dora 适用场景 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { CSSProperties } from 'react'

import Section from 'components/Product/Section'
import { useMobile } from 'hooks/ua'
import ForPc from './Pc'
import ForMobile from './Mobile'

export default function DoraFuctions() {
  const isMobile = useMobile()
  const mobileStyle: CSSProperties = {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  }
  return (
    <Section
      title="产品功能"
      name="functions"
      style={isMobile ? mobileStyle : {}}
      render={({ subPaths }: { subPaths?: string[] }) => (
        isMobile ? <ForMobile defaultActive={subPaths?.[0]} /> : <ForPc defaultActive={subPaths?.[0]} />
      )}
    />
  )
}
