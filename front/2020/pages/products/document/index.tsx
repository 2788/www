
/**
 * @file 文档处理
 */
import React from 'react'
import { InferGetStaticPropsType } from 'next'

import { useBtns } from 'hooks/product-btn'

import { Product } from 'constants/products'
import Section from 'components/Product/Section'
import Layout from 'components/Product/Layout'
import { useModal } from 'components/Feedback'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import { getNews, getNotices, INewsResponse, INotice } from 'apis/admin/product'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import Feature from 'components/pages/document/Feature'
import Advantage from 'components/pages/document/Advantage'
import Scene from 'components/pages/document/Scene'

import banner from './banner.png'

const desc = '文档处理依托先进的自然语言处理技术，提供文档预览、文档转换、文档翻译等多种文档处理服务，可广泛应用于在线教育、OA 系统、在线网盘等多种使用场景。'

function Page({ notices, newsRes }: { notices: INotice[], newsRes: INewsResponse }) {

  const { startConsulting } = useModal()

  const btns = useBtns(
    { children: '立即咨询', onClick: startConsulting }
  )

  return (
    <>
      <PageBanner
        title="文档处理"
        desc={desc}
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice notices={notices} />

      <Navigator>{btns.nav}</Navigator>

      <Feature />

      <Advantage />

      <Scene />

      <ProductNews newsRes={newsRes} />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Voice} />
          <RelatedProduct product={Product.FaceID} />
          <RelatedProduct product={Product.Vii} />
        </Related>
      </Section>
    </>
  )
}

export default function Document({ notices, newsRes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="文档处理_文档转换_文档预览_文档翻译"
      keywords="document, 文档处理, 文档转换, 文档预览, 文档翻译"
      description={desc}
    >
      <Page notices={notices} newsRes={newsRes} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Document),
      newsRes: await getNews({ product: Product.Document })
    }
  }
}
