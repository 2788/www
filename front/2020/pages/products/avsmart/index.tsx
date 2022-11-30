/**
 * @file          component  avsmart
 * @description   锐智转码产品页
 * @author        renpanpan
 */
import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { urlForPrice } from 'utils/route'
import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'
import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'
import { Product } from 'constants/products'
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

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {

  const bannerBtns = useBtns(
    { href: 'https://developer.qiniu.com/dora/6097/perceptive-transcoding-avsmart-1', children: '立即使用', pcOnly: true },
    { children: '查看价格', href: urlForPrice(Product.Dora) }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Avsmart]
  })

  return (
    <>
      <PageBanner
        title={pageInfo.bannerTitle}
        desc={pageInfo.description}
        bgColor="#34A1EC"
        btns={bannerBtns.banner}
        icon={bannerImg}
      />
      <ProductNotice {...(currentNotices || notices)} />
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

export default function Page({ globalBanners, ...pageProps }: Props) {
  return (
    <Layout
      title={pageInfo.layoutTitle}
      keywords={pageInfo.keywords}
      description={pageInfo.description}
      globalBanners={globalBanners}
    >
      <PageContent {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Avsmart),
      newsRes: await getNews({ product: Product.Avsmart }),
      globalBanners: await getGlobalBanners()
    }
  }
}
