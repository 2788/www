/**
 * @file 产品 “播放器 SDK” 落地页
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { Product } from 'constants/products'
import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'
import Navigator from 'components/Navigator'
import Advantage from 'components/pages/qnplayer/Advantage'
import QnPlayerCase from 'components/pages/qnplayer/Case'
import Document from 'components/pages/qnplayer/Document'
import Feature from 'components/pages/qnplayer/Feature'
import { getGlobalBanners } from 'apis/admin/global-banners'
import bannerImg from './banner.png'

const pageInfo = {
  layoutTitle: '播放器 SDK_点播播放器_直播播放器_多媒体播放器',
  bannerTitle: '播放器 SDK',
  keywords: '播放器 SDK, 点播播放器, 直播播放器, 多媒体播放器',
  description:
    '七牛云播放器是一款全自研内核的多媒体播放器，支持多种视频格式及流媒体协议。包体小、首开快、播放流畅、使用简单，可支持直播、点播等多种场景。'
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {
  const { startConsulting } = useFeedbackModal()

  const bannerBtns = useBtns(
    { children: '立即咨询', onClick: startConsulting },
    {
      children: '接入指南',
      href: 'https://developer.qiniu.com/pili/4262/player-sdk-introduction-and-demo-download'
    }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.QnPlayer]
  })

  return (
    <>
      <PageBanner
        title={pageInfo.bannerTitle}
        desc={pageInfo.description}
        bgColor="#34A1EC"
        btns={bannerBtns.banner}
        icon={bannerImg}
      />
      <ProductNotice {...(currentNotices || notices)} />
      <Navigator>{bannerBtns.nav}</Navigator>
      <Advantage />
      <Feature />
      <QnPlayerCase />
      <ProductNews newsRes={newsRes} />
      <Document />
    </>
  )
}

export default function QnPlayerPage({ globalBanners, ...pageProps }: Props) {
  return (
    <Layout
      title={pageInfo.layoutTitle}
      keywords={pageInfo.keywords}
      description={pageInfo.description}
      globalBanners={globalBanners}
    >
      <PageContent {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.QnPlayer),
      newsRes: await getNews({ product: Product.QnPlayer }),
      globalBanners: await getGlobalBanners()
    }
  }
}
