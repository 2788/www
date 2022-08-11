/**
 * @file  sla-fusion
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Layout'
import Wrapper from 'components/pages/agreement/Wrapper'
import Content from 'components/pages/agreement/sla/fusion'
import { getGlobalBanners } from 'apis/admin/global-banners'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

export default function SlaFusion({ globalBanners }: Props) {
  return (
    <Layout
      title="CDN SLA"
      keywords=" CDN 服务等级协议, fusion, 服务等级协议, CDN"
      description="七牛云 CDN 服务等级协议（CDN SLA）"
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
