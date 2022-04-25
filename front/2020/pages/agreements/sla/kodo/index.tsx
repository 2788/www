/**
 * @file  sla-kodo
 */

import React from 'react'

import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/sla/kodo'

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function SlaKodo() {
  return (
    <Layout
      title="对象存储 SLA"
      keywords="对象存储服务, 服务等级协议, kodo, 服务协议"
      description="七牛云对象存储服务等级协议（SLA）"
    >
      <Page />
    </Layout>
  )
}
