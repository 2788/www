/**
 * @file 产品“智能风控”
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useBtns } from 'hooks/product-btn'
import { Product } from 'constants/products'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import { getNews, getNotices, INewsResponse, INotice } from 'apis/admin/product'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import RiskControlFunctions from 'components/pages/risk-control/Functions'
import RiskControlProcess from 'components/pages/risk-control/Process'
import RiskControlAdvantages from 'components/pages/risk-control/Advantages'

import imgBanner from './_images/banner.png'

function PageContent({ notices, newsRes }: { notices: INotice[], newsRes: INewsResponse }) {
  const btns = useBtns({ href: 'https://jinshuju.net/f/cwtofb', children: '立即申请' })

  return (
    <>
      <PageBanner
        title="智能风控"
        desc="智能风控产品利用 AI 人工智能算法精准评估金融、租赁、营销等业务风险，帮助企业建立事前防范、事中监控及事后分析的全流程风控体系，识别和防范注册、交易、贷款等关键环节中的欺诈问题，减少企业损失。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <ProductNotice notices={notices} />

      <Navigator>
        {btns.nav}
      </Navigator>

      <RiskControlFunctions />

      <RiskControlProcess />

      <RiskControlAdvantages />

      <ProductNews newsRes={newsRes} />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Voice} />
          <RelatedProduct product={Product.Censor} />
          <RelatedProduct product={Product.FaceID} />
        </Related>
      </Section>
    </>
  )
}

export default function RiskControlPage({ notices, newsRes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="智能风控_安全_风险业务管理_欺诈识别"
      keywords="智能风控，安全，风险业务管理，欺诈识别"
      description="智能风控产品利用 AI 人工智能算法精准评估金融、租赁、营销等业务风险，帮助企业建立事前防范、事中监控及事后分析的全流程风控体系，识别和防范注册、交易、贷款等关键环节中的欺诈问题，减少企业损失。"
    >
      <PageContent notices={notices} newsRes={newsRes} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.RiskControl),
      newsRes: await getNews({ product: Product.RiskControl })
    }
  }
}
