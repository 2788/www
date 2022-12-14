/**
 * @file          component  voice
 * @description   智能语音页面
 * @author        renpanpan
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import { getNews, getProductPageInfo } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import { getIconIdsFromJson, getIconMap } from 'apis/admin/icon-lib'
import { Product } from 'constants/products'
import { urlForPrice } from 'utils/route'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import Function from 'components/pages/voice/Function'
import Advantage from 'components/pages/voice/Advantage'
import Scene from 'components/pages/voice/Scene'

import ProductPage from '../[product]'

import imgBanner from './images/banner.png'

const pageInfo = {
  layoutTitle: '智能语音_语音识别_录音识别_一句话识别_实时语音识别_语音合成_声纹识别',
  bannerTitle: '智能语音',
  keywords: '智能语音, 语音识别, 录音识别, 一句话识别, 实时语音识别, 语音合成, 声纹识别, 自然语言理解, 私有化',
  description:
    '智能语音基于语音识别、语音合成、声纹识别、自然语言理解等技术，实现智能语音交互，可广泛应用于智能终端设备、智能客服、质检、导航资讯播报、实时获取字幕、有声书等多种场景，同时提供私有化（本地部署）服务。'
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners' | 'productInfo' | 'iconMap'>) {
  const { showModal: showWechatConsultModal } = useWechatConsultModal()
  const priceUrl = urlForPrice(Product.Voice)

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '立即咨询' },
    { children: '查看价格', href: priceUrl }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Voice]
  })

  return (
    <>
      <PageBanner
        title={pageInfo.bannerTitle}
        desc={pageInfo.description}
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <ProductNotice {...(currentNotices || notices)} />
      <Function />
      <Advantage />
      <Scene />
      <ProductNews newsRes={newsRes} />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Censor} />
          <RelatedProduct product={Product.Vii} />
          <RelatedProduct product={Product.FaceID} />
        </Related>
      </Section>
    </>
  )
}

export default function Main({ globalBanners, productInfo, iconMap, ...pageProps }: Props) {
  if (productInfo != null) {
    return (
      <ProductPage
        productInfo={productInfo}
        globalBanners={globalBanners}
        iconMap={iconMap}
        notices={pageProps.notices}
        news={pageProps.newsRes}
      />
    )
  }

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
  const productInfo = await getProductPageInfo('voice')
  const icons = getIconIdsFromJson(productInfo)
  return {
    props: {
      notices: await getProductPageNotices(Product.Voice),
      newsRes: await getNews({ product: Product.Voice }),
      globalBanners: await getGlobalBanners(),
      productInfo,
      iconMap: await getIconMap(icons)
    }
  }
}
