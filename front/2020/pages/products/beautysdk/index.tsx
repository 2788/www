import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Product/Layout'
import { useModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'
import { Product } from 'constants/products'
import { getNews, getNotices, INewsResponse, INotice } from 'apis/admin/product'
import BeautyFuctions from 'components/pages/beautysdk/Functions'
import Scenes from 'components/pages/beautysdk/Scene'
import Demo from 'components/pages/beautysdk/Demo'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import Section from 'components/Product/Section'
import imgBanner from './images/banner.png'

export function Content({ notices, newsRes }: { notices: INotice[], newsRes: INewsResponse }) {
  const { startConsulting } = useModal()

  const btns = useBtns(
    { children: '立即咨询', onClick: startConsulting },
    { children: 'Demo 下载', href: '#demo' }
  )

  return (
    <>
      <PageBanner
        title="美颜特效 SDK"
        desc="美颜特效 SDK 提供包括美颜滤镜、美妆美型、贴纸特效、美体、手势识别、背景分割等功能。可结合七牛云强大的音视频能力，应用于各类短视频拍摄与编辑、直播与实时互动等场景，帮助开发者快速打造一站式视频类业务平台。"
        btns={btns.banner}
        icon={imgBanner} />

      <ProductNotice notices={notices} />
      <Navigator>{btns.nav}</Navigator>
      <BeautyFuctions />
      <Scenes />
      <Demo />
      <ProductNews newsRes={newsRes} />
      <Section name="related" title="相关产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Rtn} />
          <RelatedProduct product={Product.Plsv} />
          <RelatedProduct product={Product.Pili} />
        </Related>
      </Section>
    </>
  )
}

export default function Page({ notices, newsRes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="美颜特效 SDK_短视频特效 SDK_直播特效 SDK_实时音视频特效"
      keywords="美颜特效，滤镜，手势识别，贴纸，AR，美妆，美型，美体、背景分割、短视频，直播"
      description="美颜特效 SDK 提供包括美颜滤镜、美妆美型、贴纸特效、美体、手势识别、背景分割等功能。可结合七牛云强大的音视频能力，应用于各类短视频拍摄与编辑、直播与实时互动等场景，帮助开发者快速打造一站式视频类业务平台。"
    >
      <Content notices={notices} newsRes={newsRes} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Beautysdk),
      newsRes: await getNews({ product: Product.Beautysdk })
    }
  }
}
