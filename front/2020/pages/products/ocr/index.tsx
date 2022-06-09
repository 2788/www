
/**
 * @file 票证自动识别 OCR
 */
import React from 'react'
import { InferGetStaticPropsType } from 'next'

import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import PageBanner from 'components/Product/PageBanner'
import { useMobile } from 'hooks/ua'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { urlForPrice } from 'utils/route'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import Advantage from 'components/pages/ocr/Advantage'
import OcrProduct from 'components/pages/ocr/Product'
import Function from 'components/pages/ocr/Function'
import Scene from 'components/pages/ocr/Scene'

import { useModal as useFeedbackModal } from 'components/Feedback'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import { useBtns } from 'hooks/product-btn'
import { Product } from 'constants/products'

import banner from './banner.png'

type Props = InferGetStaticPropsType<typeof getStaticProps>

function PageContent({ notices, newsRes }: Props) {

  const { startConsulting } = useFeedbackModal()

  const priceUrl = urlForPrice(Product.Ocr)
  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' },
    { children: '查看价格', href: priceUrl }
  )

  const isMobile = useMobile()
  const funcContent = !isMobile && <Function />
  return (
    <>
      <PageBanner
        title="票证自动识别 OCR"
        desc="票证自动识别 OCR 基于行业前沿的深度学习技术，提供单张多张发票识别，身份证识别，车险保单识别，营业执照识别，新车发票识别，车辆登记识别等服务，帮助解决信息结构化问题，大幅提升信息处理效率。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice {...notices} />

      <OcrProduct />

      {funcContent}

      <Advantage />

      <Scene />

      <ProductNews newsRes={newsRes} />

      <Section name="related" title="相关产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Dora} />
          <RelatedProduct product={Product.FaceID} />
          <RelatedProduct product={Product.Censor} />
        </Related>
      </Section>
    </>
  )
}

export default function OcrPage(props: Props) {
  return (
    <Layout
      title="票证自动识别 OCR"
      keywords="票证自动识别, OCR, open api, 身份证识别, 车险保单识别, 营业执照识别, 新车发票识别, 车辆登记识别"
      description="票证自动识别 OCR 基于行业前沿的深度学习技术，提供单张多张发票识别，身份证识别，车险保单识别，营业执照识别，新车发票识别，车辆登记识别等服务，帮助解决信息结构化问题，大幅提升信息处理效率。"
    >
      <PageContent {...props} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Ocr),
      newsRes: await getNews({ product: Product.Ocr })
    }
  }
}
