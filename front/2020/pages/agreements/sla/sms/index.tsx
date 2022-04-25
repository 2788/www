/**
 * @file sla-sms
 */

import React from 'react'

import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/sla/sms'

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function SlaSms() {
  return (
    <Layout
      title="云短信 SLA"
      keywords="云短信 SLA, 短信服务等级协议, 云短信, 短信服务, sms"
      description="七牛云短信服务等级协议（云短信 SLA）"
    >
      <Page />
    </Layout>
  )
}
