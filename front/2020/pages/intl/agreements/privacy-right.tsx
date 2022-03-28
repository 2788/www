/**
 * @file 七牛云隐私权政策
 */
import React from 'react'

import Layout from 'components/Product/Layout'
import Wrapper from 'components/pages/intl/agreements/Wrapper'
import Content from 'components/pages/intl/agreements/privacy-right'

function Page() {
  return (
    <Wrapper active="privacy-right">
      <Content />
    </Wrapper>
  )
}

export default function PrivacyRight() {
  return (
    <Layout
      title="七牛云隐私权政策"
      keywords="七牛云, 隐私权政策"
      description="七牛云隐私权政策"
    >
      <Page />
    </Layout>
  )
}
