/**
 * @file 七牛云隐私权政策英文版
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/privacy-right/en'
import { getGlobalBanners } from 'apis/admin/global-banners'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function PrivacyRightEn({ globalBanners }: Props) {
  return (
    <Layout
      title="Qiniu Cloud Privacy Policy"
      keywords="Qiniu, Cloud, Qiniu Cloud, Privacy, Policy, Privacy Policy"
      description="Qiniu Cloud Privacy Policy"
      globalBanners={globalBanners}
    >
      <Page />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
