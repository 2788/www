/**
 * @file 产品 “智能视频分析” 落地页
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'
import { useBtns } from 'hooks/product-btn'
import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { Product } from 'constants/products'
import { urlForPrice } from 'utils/route'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Layout from 'components/Product/Layout'
import Scenes from 'components/pages/vii/Scene'
import Advantage from 'components/pages/vii/Advantage'
import Features from 'components/pages/vii/Feature'
import Navigator from 'components/Product/Navigator'
import PageBanner from 'components/Product/PageBanner'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'
import RelatedProducts from 'components/pages/vii/RelatedProducts'
import bannerImg from './banner.png'

const pageInfo = {
  layoutTitle: '视频智能分析_视频标签_图片标签_语音识别_录音转文字',
  bannerTitle: '视频智能分析',
  keywords: '视频智能分析, 视频标签, 图片标签, 语音识别, 录音转文字, 视频检索, 视频分类',
  description:
    '视频智能分析是一款针对视频等多媒体文件，通过对视频，图片，音频等内容的多维理解，对其实现结构化标签提取，审核，识别等功能的产品，可广泛应用于多媒体内容的管理，搜索和推荐。'
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

function PageContent({ notices, newsRes }: Props) {
  const { startConsulting } = useFeedbackModal()
  const priceUrl = urlForPrice(Product.Vii)

  const bannerBtns = useBtns(
    { href: 'https://portal.qiniu.com/vii/tasks', children: '立即使用', pcOnly: true },
    { onClick: startConsulting, children: '立即咨询' },
    { children: '查看价格', href: priceUrl }
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
      <ProductNotice {...notices} />
      <Navigator>{bannerBtns.nav}</Navigator>
      <Features />
      <Advantage />
      <Scenes />
      <ProductNews newsRes={newsRes} />
      <RelatedProducts />
    </>
  )
}

export default function ViiPage(props: Props) {
  return (
    <Layout title={pageInfo.layoutTitle} keywords={pageInfo.keywords} description={pageInfo.description}>
      <PageContent {...props} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Vii),
      newsRes: await getNews({ product: Product.Vii })
    }
  }
}
