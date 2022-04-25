/**
 * @file sla-pili
 */

import React from 'react'

import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/sla/pili'

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function SlaPili() {
  return (
    <Layout
      title="直播云 SLA"
      keywords="直播云 SLA, 服务等级协议, 直播云, pili, 协议"
      description="七牛直播云服务等级协议（直播云 SLA）"
    >
      <Page />
    </Layout>
  )
}
