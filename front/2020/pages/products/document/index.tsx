
/**
 * @file 文档处理
 */
import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'

import { Product } from 'constants/products'
import Section from 'components/Product/Section'
import Layout from 'components/Product/Layout'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import Feature from 'components/pages/document/Feature'
import Advantage from 'components/pages/document/Advantage'
import Scene from 'components/pages/document/Scene'

import banner from './banner.png'

const desc = '文档处理依托先进的自然语言处理技术，提供文档预览、文档转换、文档翻译等多种文档处理服务，可广泛应用于在线教育、OA 系统、在线网盘等多种使用场景。'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {

  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { children: '立即咨询', onClick: showWechatConsultModal }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Document]
  })

  return (
    <>
      <PageBanner
        title="文档处理"
        desc={desc}
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice {...(currentNotices || notices)} />

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

export default function Document({ globalBanners, ...pageProps }: Props) {
  return (
    <Layout
      title="文档处理_文档转换_文档预览_文档翻译"
      keywords="document, 文档处理, 文档转换, 文档预览, 文档翻译"
      description={desc}
      globalBanners={globalBanners}
    >
      <PageContent {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Document),
      newsRes: await getNews({ product: Product.Document }),
      globalBanners: await getGlobalBanners()
    }
  }
}
