/**
 * @file 七牛云隐私权政策英文版
 */
import React from 'react'

import Layout from 'components/Product/Layout'
import Wrapper from 'components/pages/privacy-right/Wrapper'
import Content from 'components/pages/privacy-right/Content/en'

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function PrivacyRightEn() {
  return (
    <Layout
      title="Qiniu Cloud Privacy Policy"
      keywords="Qiniu, Cloud, Qiniu Cloud, Privacy, Policy, Privacy Policy"
      description="Qiniu Cloud Privacy Policy"
    >
      <Page />
    </Layout>
  )
}
