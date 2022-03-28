/**
 * @file 七牛云用户服务协议
 */
import React from 'react'

import Layout from 'components/Product/Layout'
import Wrapper from 'components/pages/intl/agreements/Wrapper'
import Content from 'components/pages/intl/agreements/user-agreement'

function Page() {
  return (
    <Wrapper active="user-agreement">
      <Content />
    </Wrapper>
  )
}

export default function UserAgreement() {
  return (
    <Layout
      title="七牛云用户服务协议"
      keywords="七牛云, 用户服务协议, 用户协议"
      description="七牛云用户服务协议"
    >
      <Page />
    </Layout>
  )
}
