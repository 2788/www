/**
 * @file          component  voice
 * @description   智能语音页面
 * @author        renpanpan
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'

import { useBtns } from 'hooks/product-btn'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import { getNotices, INotice } from 'apis/admin/notice'
import { Product } from 'constants/products'
import ProductNotice from 'components/Product/common/ProductNotice'

import Function from 'components/pages/voice/Function'
import Advantage from 'components/pages/voice/Advantage'
import Scene from 'components/pages/voice/Scene'

import imgBanner from './images/banner.png'

const pageInfo = {
  layoutTitle: '智能语音_语音识别_录音识别_一句话识别_实时语音识别_语音合成_声纹识别',
  bannerTitle: '智能语音',
  keywords: '智能语音, 语音识别, 录音识别, 一句话识别, 实时语音识别, 语音合成, 声纹识别, 自然语言理解, 私有化',
  description:
    '智能语音基于语音识别、语音合成、声纹识别、自然语言理解等技术，实现智能语音交互，可广泛应用于智能终端设备、智能客服、质检、导航资讯播报、实时获取字幕、有声书等多种场景，同时提供私有化（本地部署）服务。'
}

export function Page({ notices }: { notices: INotice[] }) {
  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title={pageInfo.bannerTitle}
        desc={pageInfo.description}
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <ProductNotice notices={notices} />
      <Function />
      <Advantage />
      <Scene />

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

export default function Main({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title={pageInfo.layoutTitle}
      keywords={pageInfo.keywords}
      description={pageInfo.description}
    >
      <Page notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Voice)
    }
  }
}
