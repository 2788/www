/**
 * @file 拦截老页面 https://www.qiniu.com/events/free，重定向至 https://marketing.qiniu.com/activity/act-free
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Layout'
import Banner from 'components/Banner'
import MpBanner from 'components/mp/Banner'
import { Navigatable } from 'components/Product/Navigator'
import FreeProducts from 'components/pages/events/free/Products'
import FreeActivities from 'components/pages/events/free/Activities'
import Section from 'components/Product/Section'
import { useMp } from 'hooks/ua'
import Redirect from 'components/Redirect'
import { getGlobalBanners } from 'apis/admin/global-banners'

import imgBanner from './banner.png'
import mpBannner from './banner-mp.png'
import style from './style.less'

export function FreePage() {
  const isMp = useMp()

  if (isMp) {
    return <MpPage />
  }

  return (
    <Navigatable>
      <Banner background={imgBanner} backgroundSize="auto 100%" backgroundPosition="right">
        <h1 className={style.bannerTitle}>
          <strong>免费</strong>云服务套餐
        </h1>
        <p className={style.bannerDesc}>为您提供 0 元上云服务</p>
      </Banner>

      <Section name="products" title="热门云产品" subtitle="完成实名认证 即可免费体验以下产品">
        <FreeProducts />
      </Section>

      <Section name="activities" title="活动推荐" withTailPadding>
        <FreeActivities />
      </Section>
    </Navigatable>
  )
}

function MpPage() {
  return (
    <div style={{ padding: '16px' }}>
      <MpBanner banner={mpBannner} style={{ marginBottom: '24px' }} />
      <FreeProducts />
    </div>
  )
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Main({ globalBanners }: Props) {
  // 暂时将页面重定向，以前代码保留，以后可能会换回来
  return <Redirect target="https://marketing.qiniu.com/activity/act-free" />
  return (
    <Layout
      title="免费云服务套餐"
      keywords="免费, 免费云服务, 对象存储, CDN 加速, 内容安全, 日志管理, 短视频 SDK, SSL 证书, 云主机, 云短信, 智能多媒体服务"
      description="七牛云为客户提供对象存储、CDN 加速、内容安全、智能日志管理、短视频 SDK、播放器 SDK、SSL 证书、智能多媒体服务等产品和服务免费套餐，助力企业和开发者零门槛上云。"
      globalBanners={globalBanners}
    >
      <FreePage />
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
