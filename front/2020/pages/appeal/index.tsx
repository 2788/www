/**
 * @file 申诉
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Layout'
import Banner, * as banner from 'components/Banner'
import AppealMain from 'components/Appeal'
import { getGlobalBanners } from 'apis/admin/global-banners'

import imgBanner from './banner-bg.png'
import style from './style.less'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function AppealBanner() {
  return (
    <Banner className={style.banner} background={imgBanner} backgroundSize="auto 100%" backgroundPosition="right">
      <banner.Title className={style.title}>
        申诉平台
      </banner.Title>
      <banner.Desc>
        <span className={style.subtitle}>七牛云与你共建晴朗健康的互联网空间</span>
      </banner.Desc>
    </Banner>
  )
}

function PageContent() {
  return (
    <div>
      <AppealBanner />
      <AppealMain />
    </div>
  )
}

export default function AppealPage({ globalBanners }: Props) {
  return (
    <Layout
      title="申诉平台"
      keywords="七牛云, 申诉"
      description="七牛云与你共建晴朗健康的互联网空间"
      globalBanners={globalBanners}
    >
      <PageContent />
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
