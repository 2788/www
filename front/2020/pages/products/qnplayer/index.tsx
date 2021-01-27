/**
 * @file 产品 “播放器 SDK” 落地页
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'
import { getNotices, INotice } from 'apis/admin/notice'
import { Product } from 'constants/products'
import { useBtns } from 'hooks/product-btn'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import ProductNotice from 'components/Product/common/ProductNotice'
import Navigator from 'components/Navigator'
import Advantage from 'components/pages/qnplayer/Advantage'
import QnPlayerCase from 'components/pages/qnplayer/Case'
import Document from 'components/pages/qnplayer/Document'
import Feature from 'components/pages/qnplayer/Feature'
import bannerImg from './banner.png'

const pageInfo = {
  layoutTitle: '播放器 SDK_点播播放器_直播播放器_多媒体播放器',
  bannerTitle: '播放器 SDK',
  keywords: '播放器 SDK, 点播播放器, 直播播放器, 多媒体播放器',
  description:
    '七牛云播放器是一款全自研内核的多媒体播放器，支持多种视频格式及流媒体协议。包体小、首开快、播放流畅、使用简单，可支持直播、点播等多种场景。'
}

function PageContent({ notices }: { notices: INotice[] }) {
  const { startConsulting } = useFeedbackModal()

  const bannerBtns = useBtns(
    { children: '立即咨询', onClick: startConsulting },
    {
      children: '接入指南',
      href: 'https://developer.qiniu.com/pili/4262/player-sdk-introduction-and-demo-download'
    }
  )

  return (
    <>
      <PageBanner
        title={pageInfo.bannerTitle}
        desc={pageInfo.description}
        bgColor="#34A1EC"
        btns={bannerBtns.banner}
        icon={bannerImg}
      />
      <ProductNotice notices={notices} />
      <Navigator>{bannerBtns.nav}</Navigator>
      <Advantage />
      <Feature />
      <QnPlayerCase />
      <Document />
    </>
  )
}

export default function QnPlayerPage({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title={pageInfo.layoutTitle}
      keywords={pageInfo.keywords}
      description={pageInfo.description}
    >
      <PageContent notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.QnPlayer)
    }
  }
}
