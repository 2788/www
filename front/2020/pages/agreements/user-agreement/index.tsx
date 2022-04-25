/**
 * @file 七牛云服务用户协议
 */

import React from 'react'

import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/user-agreement'

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function UserAgreement() {
  return (
    <Layout
      title="服务用户协议"
      keywords="服务用户协议, 用户协议, 服务, 协议, 商务"
      description="服务用户协议"
    >
      <Page />
    </Layout>
  )
}
