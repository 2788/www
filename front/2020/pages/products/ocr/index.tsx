
/**
 * @file 票证自动识别 OCR
 */
import React from 'react'
import { InferGetStaticPropsType } from 'next'

import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import PageBanner from 'components/Product/PageBanner'
import { useMobile } from 'hooks/ua'

import { getNotices, INotice } from 'apis/admin/notice'
import ProductNotice from 'components/Product/common/ProductNotice'

import Navigator from 'components/Product/Navigator'
import Advantage from 'components/pages/ocr/Advantage'
import OcrProduct from 'components/pages/ocr/Product'
import Function from 'components/pages/ocr/Function'
import Scene from 'components/pages/ocr/Scene'

import { useModal as useFeedbackModal } from 'components/Feedback'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import { useBtns } from 'hooks/product-btn'
import { Product } from 'constants/products'

import banner from './banner.png'

function Page({ notices }: { notices: INotice[] }) {

  const { startConsulting } = useFeedbackModal()

  const priceUrl = 'https://developer.qiniu.com/dora/api/7038/pricingofOCR'
  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' }
  )

  const isMobile = useMobile()
  const funcContent = !isMobile && <Function />
  return (
    <>
      <PageBanner
        title="票证自动识别 OCR"
        desc="票证自动识别 OCR 基于行业前沿的深度学习技术，提供身份证识别，车险保单识别，营业执照识别，新车发票识别，车辆登记识别等服务，帮助解决信息结构化问题，大幅提升信息处理效率。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice notices={notices} />

      <Navigator priceLink={priceUrl}>{btns.nav}</Navigator>

      <Advantage />

      <OcrProduct />

      {funcContent}

      <Scene />

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

export default function OcrPage({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="票证自动识别 OCR"
      keywords="票证自动识别, OCR, open api, 身份证识别, 车险保单识别, 营业执照识别, 新车发票识别, 车辆登记识别"
      description="票证自动识别 OCR 基于行业前沿的深度学习技术，提供身份证识别，车险保单识别，营业执照识别，新车发票识别，车辆登记识别等服务，帮助解决信息结构化问题，大幅提升信息处理效率。"
    >
      <Page notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Ocr)
    }
  }
}
