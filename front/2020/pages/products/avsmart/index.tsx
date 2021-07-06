/**
 * @file          component  avsmart
 * @description   锐智转码产品页
 * @author        renpanpan
 */
import React from 'react'
import { InferGetStaticPropsType } from 'next'

import { useBtns } from 'hooks/product-btn'
import { getNews, getNotices, INewsResponse, INotice } from 'apis/admin/product'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'
import { Product, priceUrlMap } from 'constants/products'
import Layout from 'components/Product/Layout'
import Navigator from 'components/Product/Navigator'
import PageBanner from 'components/Product/PageBanner'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import Function from 'components/pages/avsmart/Function'
import Scene from 'components/pages/avsmart/Scene'

import bannerImg from './banner.png'

const pageInfo = {
  layoutTitle: '锐智转码_窄带高清_高清低码_画质增强',
  bannerTitle: '锐智转码 2.0',
  keywords: '锐智转码，窄带高清，高清低码，画质增强',
  description: '智能分析视频内容场景特性，动态调整图像增强算法，并结合高性能视频编码器，实现在更低带宽下，传输更清晰的视频。'
}

function PageContent({ notices, newsRes }: { notices: INotice[], newsRes: INewsResponse }) {

  const bannerBtns = useBtns(
    { href: 'https://developer.qiniu.com/dora/6097/perceptive-transcoding-avsmart-1', children: '立即使用', pcOnly: true },
    { children: '查看价格', href: priceUrlMap[Product.Dora] }
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

      <Function />
      <Scene />

      <ProductNews newsRes={newsRes} />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
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
    <Layout title={pageInfo.layoutTitle} keywords={pageInfo.keywords} description={pageInfo.description}>
      <PageContent notices={notices} newsRes={newsRes} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Avsmart),
      newsRes: await getNews({ product: Product.Avsmart })
    }
  }
}
