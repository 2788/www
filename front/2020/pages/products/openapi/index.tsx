import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Services from 'components/pages/openapi/Services'
import Advantage from 'components/pages/openapi/Advantage'
import Cases from 'components/pages/openapi/Cases'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'
import { urlForPrice } from 'utils/route'
import { Product, urlMap } from 'constants/products'

import banner from './banner.png'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {
  const btns = useBtns(
    { href: `${urlMap[Product.OpenAPI]}/partner`, children: '合作申请' },
    { children: '立即使用', href: 'https://portal.qiniu.com/openapi', pcOnly: true },
    { href: urlForPrice(Product.OpenAPI), children: '产品价格' }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.OpenAPI]
  })

  return (
    <>
      <PageBanner
        title="AI 开放市场"
        desc="AI 开放市场是一个开放平台，协同合作伙伴一起为七牛的客户提供图片，文本，音频，视频等智能数据处理服务，实现对媒体内容的智能审核，智能处理。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice {...(currentNotices || notices)} />

      <Navigator>{btns.nav}</Navigator>

      <Services />

      <Advantage />

      <Cases />

      <ProductNews newsRes={newsRes} />
    </>
  )
}

export default function Main({ globalBanners, ...pageProps }: Props) {
  return (
    <Layout
      title="AI 开放市场_Open API"
      keywords="AI 开放市场, AI, 开放市场, Open API, openapi, open api, 开放平台, 第三方, 图片, 音视频, 数据处理"
      description="AI 开放市场是一个开放平台，协同合作伙伴一起为七牛的客户提供图片，文本，音频，视频等智能数据处理服务，实现对媒体内容的智能审核，智能处理。"
      globalBanners={globalBanners}
    >
      <PageContent {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.OpenAPI),
      newsRes: await getNews({ product: Product.OpenAPI }),
      globalBanners: await getGlobalBanners()
    }
  }
}
