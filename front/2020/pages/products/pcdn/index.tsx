/**
 * @file PCDN
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'
import { Product } from 'constants/products'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'

import { getNotices, INotice } from 'apis/admin/notice'
import ProductNotice from 'components/Product/common/ProductNotice'

import Navigator from 'components/Product/Navigator'
import Advantage from 'components/pages/pcdn/Advantage'
import Architecture from 'components/pages/pcdn/Architecture'
import PcdnProduct from 'components/pages/pcdn/Product'
import Scene from 'components/pages/pcdn/Scene'

import { useBtns } from 'hooks/product-btn'

import banner from './banner.png'

function Page({ notices }: { notices: INotice[] }) {

  const btns = useBtns(
    { href: 'https://jinshuju.net/f/PMkW40', children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title="PCDN"
        desc="七牛 PCDN 将 P2P 协议融入传统 CDN 服务，通过挖掘海量闲置资源的上行带宽，将节点进一步下沉至边缘。使用 PCDN 可以极大地降低热点内容的分发成本，同时消除了来自于服务器的性能瓶颈和单点故障问题，提升终端用户的使用体验。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <ProductNotice notices={notices} />

      <Advantage />

      <Architecture />

      <PcdnProduct />

      <Scene />
    </>
  )
}

export default function PcdnPage({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="PCDN_P2P 协议融入 CDN_CDN 网络加速"
      keywords="PCDN, P2P, CDN, 闲置资源, 海量闲置资源, 节点下沉, 降低分发成本, 性能瓶颈, 单点故障, 显著提升服务体验指标, 百万级在线设备, 稳定可靠, 多种接入方式, 弱网传输优化, 精益调度, 存储创新, 快速推送"
      description="七牛 PCDN 将 P2P 协议融入传统 CDN 服务，通过挖掘海量闲置资源的上行带宽，将节点进一步下沉至边缘。使用 PCDN 可以极大地降低热点内容的分发成本，同时消除了来自于服务器的性能瓶颈和单点故障问题，提升终端用户的使用体验。"
    >
      <Page notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Pcdn)
    }
  }
}
