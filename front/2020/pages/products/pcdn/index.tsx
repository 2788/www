/**
 * @file PCDN
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { Product } from 'constants/products'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import Navigator from 'components/Product/Navigator'
import Advantage from 'components/pages/pcdn/Advantage'
import Architecture from 'components/pages/pcdn/Architecture'
import PcdnProduct from 'components/pages/pcdn/Product'
import Scene from 'components/pages/pcdn/Scene'

import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'

import banner from './banner.png'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {

  const btns = useBtns(
    { href: 'https://jinshuju.net/f/PMkW40', children: '立即咨询' }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Pcdn]
  })

  return (
    <>
      <PageBanner
        title="边缘加速"
        desc="七牛边缘加速将 P2P 协议融入传统 CDN 服务，通过挖掘海量闲置资源的上行带宽，将节点进一步下沉至边缘。使用边缘加速可以极大地降低热点内容的分发成本，同时消除了来自于服务器的性能瓶颈和单点故障问题，提升终端用户的使用体验。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <ProductNotice {...(currentNotices || notices)} />

      <Advantage />

      <Architecture />

      <PcdnProduct />

      <Scene />

      <ProductNews newsRes={newsRes} />
    </>
  )
}

export default function PcdnPage({ globalBanners, ...pageProps }: Props) {
  return (
    <Layout
      title="边缘加速_P2P 协议融入 CDN_CDN 网络加速"
      keywords="边缘加速, P2P, CDN, 闲置资源, 海量闲置资源, 节点下沉, 降低分发成本, 性能瓶颈, 单点故障, 显著提升服务体验指标, 百万级在线设备, 稳定可靠, 多种接入方式, 弱网传输优化, 精益调度, 存储创新, 快速推送"
      description="七牛边缘加速将 P2P 协议融入传统 CDN 服务，通过挖掘海量闲置资源的上行带宽，将节点进一步下沉至边缘。使用边缘加速可以极大地降低热点内容的分发成本，同时消除了来自于服务器的性能瓶颈和单点故障问题，提升终端用户的使用体验。"
      globalBanners={globalBanners}
    >
      <PageContent {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Pcdn),
      newsRes: await getNews({ product: Product.Pcdn }),
      globalBanners: await getGlobalBanners()
    }
  }
}
