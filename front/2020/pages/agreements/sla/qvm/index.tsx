/**
 * @file sla-qvm
 */

import React from 'react'

import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/sla/qvm'

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function SlaQvm() {
  return (
    <Layout
      title="云服务器 QVM SLA"
      keywords="云服务器, QVM, 服务等级协议, 协议"
      description="云服务器 QVM 服务等级协议（云服务器 QVM SLA）"
    >
      <Page />
    </Layout>
  )
}
