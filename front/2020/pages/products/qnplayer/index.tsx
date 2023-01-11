/**
 * @file 产品 “播放器 SDK” 落地页
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { Product } from 'constants/products'
import { useMobile } from 'hooks/ua'
import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'
import Navigator from 'components/Navigator'
import Advantage from 'components/pages/qnplayer/Advantage'
import QnPlayerCase from 'components/pages/qnplayer/Case'
import Document from 'components/pages/qnplayer/Document'
import Feature from 'components/pages/qnplayer/Feature'
import { getGlobalBanners } from 'apis/admin/global-banners'

import bannerImgPc from './banner-pc.jpg'
import bannerImgMobile from './banner-mobile.jpg'

const pageInfo = {
  layoutTitle: '播放器 SDK_点播播放器_直播播放器_多媒体播放器',
  bannerTitle: '播放器 SDK',
  keywords: '播放器 SDK, 点播播放器, 直播播放器, 多媒体播放器',
  description:
    '七牛云播放器是一款全自研内核的多媒体播放器，支持多种视频格式及流媒体协议。包体小、首开快、播放流畅、使用简单，可支持直播、点播等多种场景。'
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {
  const isMobile = useMobile()
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const bannerBtns = useBtns(
    { children: '立即咨询', onClick: showWechatConsultModal },
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
        btns={bannerBtns.banner}
        bgImgUrl={isMobile ? bannerImgMobile : bannerImgPc}
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
    <headerThemeContext.Provider value="dark">
      <Layout
        title={pageInfo.layoutTitle}
        keywords={pageInfo.keywords}
        description={pageInfo.description}
        globalBanners={globalBanners}
      >
        <PageContent {...pageProps} />
      </Layout>
    </headerThemeContext.Provider>
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
