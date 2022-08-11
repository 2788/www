/**
 * @file 七牛云隐私权政策
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Layout'
import Wrapper from 'components/pages/intl/agreements/Wrapper'
import Content from 'components/pages/intl/agreements/privacy-right'
import { getGlobalBanners } from 'apis/admin/global-banners'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function PrivacyRight({ globalBanners }: Props) {
  return (
    <Layout
      title="七牛云隐私权政策"
      keywords="七牛云, 隐私权政策"
      description="七牛云隐私权政策"
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
