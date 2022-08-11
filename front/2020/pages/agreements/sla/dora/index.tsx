/**
 * @file sla-dora
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/sla/dora'
import { getGlobalBanners } from 'apis/admin/global-banners'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function SlaDora({ globalBanners }: Props) {
  return (
    <Layout
      title="智能多媒体数据服务 SLA"
      keywords="智能多媒体数据服务, 智能多媒体数据处理, dora, 服务等级协议"
      description="七牛云智能多媒体数据处理服务等级协议（智能多媒体数据处理 SLA）"
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
