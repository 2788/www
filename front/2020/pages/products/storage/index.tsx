
/**
 * @file 云存储一体机（产品和方案均有云存储一体机，共享内容）
 */
import React from 'react'
import { InferGetStaticPropsType } from 'next'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import { Product } from 'constants/products'

import { getNews, getNotices, INewsResponse, INotice } from 'apis/admin/product'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import Navigator from 'components/Product/Navigator'
import Advantage from 'components/pages/storage/Advantage'
import Scene from 'components/pages/storage/Scene'
import Cases from 'components/pages/storage/Cases'

import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'

import banner from './banner.png'

function Page({ notices, newsRes }: { notices: INotice[], newsRes: INewsResponse }) {

  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title="云存储一体机"
        desc="七牛云存储一体机，预集成七牛自主研发的企业级存储服务和智能多媒体计算平台，经过深度的软硬件整合优化，以一体机为载体，实现敏捷部署、开箱即用，降低企业 IT 基础架构建设与运维成本。以高性能、高可扩展、高可靠、高资源利用率的存储能力和对软、硬件资源统一管理能力，帮助企业轻松管理和智能处理 EB 级海量数据。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice notices={notices} />

      <Navigator>{btns.nav}</Navigator>

      <Advantage title="产品优势" />

      <Scene />

      <Cases />

      <ProductNews newsRes={newsRes} />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Kodo} />
          <RelatedProduct product={Product.Dora} />
          <RelatedProduct product={Product.Express} />
        </Related>
      </Section>
    </>
  )
}

export default function StoragePage({ notices, newsRes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="云存储_云存储一体机"
      keywords="七牛, 云存储, 一体机, 云存储一体机, 企业级, 存储服务, 多媒体计算平台, 敏捷部署, 开箱即用, 高性能, 高可扩展, 高可靠, 高资源利用率, 统一管理, 海量数据"
      description="七牛云存储一体机，预集成七牛自主研发的企业级存储服务和智能多媒体计算平台，经过深度的软硬件整合优化，以一体机为载体，实现敏捷部署、开箱即用，降低企业 IT 基础架构建设与运维成本。以高性能、高可扩展、高可靠、高资源利用率的存储能力和对软、硬件资源统一管理能力，帮助企业轻松管理和智能处理 EB 级海量数据。"
    >
      <Page notices={notices} newsRes={newsRes} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Storage),
      newsRes: await getNews({ product: Product.Storage })
    }
  }
}
