/**
 * @file  sla-fusion
 */

import React from 'react'

import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/sla/fusion'

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function SlaFusion() {
  return (
    <Layout
      title="CDN SLA"
      keywords=" CDN 服务等级协议, fusion, 服务等级协议, CDN"
      description="七牛云 CDN 服务等级协议（CDN SLA）"
    >
      <Page />
    </Layout>
  )
}
