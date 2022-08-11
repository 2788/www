/**
 * @file 七牛云用户服务协议
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Layout'
import Wrapper from 'components/pages/intl/agreements/Wrapper'
import Content from 'components/pages/intl/agreements/user-agreement'
import { getGlobalBanners } from 'apis/admin/global-banners'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function UserAgreement({ globalBanners }: Props) {
  return (
    <Layout
      title="七牛云用户服务协议"
      keywords="七牛云, 用户服务协议, 用户协议"
      description="七牛云用户服务协议"
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
