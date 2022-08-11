/**
 * @file 七牛云服务用户协议
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/user-agreement'
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
      title="服务用户协议"
      keywords="服务用户协议, 用户协议, 服务, 协议, 商务"
      description="服务用户协议"
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
