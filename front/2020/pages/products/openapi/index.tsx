import React from 'react'
import { InferGetStaticPropsType } from 'next'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Services from 'components/pages/openapi/Services'
import Advantage from 'components/pages/openapi/Advantage'
import Cases from 'components/pages/openapi/Cases'

import { getNews, getNotices, INewsResponse, INotice } from 'apis/admin/product'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import { useBtns } from 'hooks/product-btn'
import { urlForPrice } from 'utils/route'
import { Product, urlMap } from 'constants/products'

import banner from './banner.png'

function Page({ notices, newsRes }: { notices: INotice[], newsRes: INewsResponse }) {
  const btns = useBtns(
    { href: `${urlMap[Product.OpenAPI]}/partner`, children: '合作申请' },
    { children: '立即使用', href: 'https://portal.qiniu.com/openapi', pcOnly: true },
    { href: urlForPrice(Product.OpenAPI), children: '产品价格' }
  )

  return (
    <>
      <PageBanner
        title="AI 开放市场"
        desc="AI 开放市场提供图片，文本，音频，视频等智能数据处理服务，对媒体内容实现智能审核，智能分析。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice notices={notices} />

      <Navigator>{btns.nav}</Navigator>

      <Services />

      <Advantage />

      <Cases />

      <ProductNews newsRes={newsRes} />
    </>
  )
}

export default function Main({ notices, newsRes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="AI 开放市场_Open API"
      keywords="AI 开放市场, AI, 开放市场, Open API, openapi, open api, 开放平台, 第三方, 图片, 音视频, 数据处理"
      description="AI 开放市场提供图片，文本，音频，视频等智能数据处理服务，对媒体内容实现智能审核，智能分析。"
    >
      <Page notices={notices} newsRes={newsRes} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.OpenAPI),
      newsRes: await getNews({ product: Product.OpenAPI })
    }
  }
}
