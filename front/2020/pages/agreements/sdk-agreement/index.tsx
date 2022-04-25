/**
 * @file sdk-agreement
 */

import React from 'react'

import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/sdk-agreement'

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function SdkAgreement() {
  return (
    <Layout
      title="短视频 SDK 服务协议"
      keywords="SDK 服务协议, 短视频, 服务协议, SDK, 服务"
      description="短视频 SDK 服务协议"
    >
      <Page />
    </Layout>
  )
}
