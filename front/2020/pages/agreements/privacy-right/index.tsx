/**
 * @file 七牛云隐私权政策中文版
 */
import React from 'react'

import Layout from 'components/Product/Layout'
import Wrapper from 'components/pages/privacy-right/Wrapper'
import Content from 'components/pages/privacy-right/Content'

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function PrivacyRight() {
  return (
    <Layout
      title="隐私权政策"
      keywords="隐私权政策, 隐私, 隐私权, 政策, 信息安全"
      description="隐私权政策"
    >
      <Page />
    </Layout>
  )
}