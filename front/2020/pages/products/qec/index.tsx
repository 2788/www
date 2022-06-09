/**
 * @file 专有云计算
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'
import ProductNotice from 'components/Product/common/ProductNotice'
import Advantages from 'components/pages/products/qec/Advantages'
import Functions from 'components/pages/products/qec/Functions'
import Arch from 'components/pages/products/qec/Architecture'
import Delivery from 'components/pages/products/qec/Delivery'
import { Product } from 'constants/products'
import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import ProductNews from 'components/Product/common/ProductNews'

import banner from './_images/banner.png'

type Props = InferGetStaticPropsType<typeof getStaticProps>

function PageContent({ notices, newsRes }: Props) {
  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title="专有云计算 Qiniu Enterprise Cloud"
        desc="七牛专有云计算（QEC）是七牛云为政企、金融、能源等行业提供的，部署在客户本地数据中心或七牛云机房的云基础设施。七牛专有云计算的架构设计和公有云保持一致，兼顾公有云的快速创新能力和私有云的可管可控，以满足企业对业务信息化高性能、高可靠、可扩展、简单易用的诉求。"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice {...notices} />

      <Navigator>
        {btns.nav}
      </Navigator>

      <Advantages />
      <Functions />
      <Arch />
      <Delivery />
      <ProductNews newsRes={newsRes} />
    </>
  )
}

export default function Main(props: Props) {
  return (
    <Layout
      title="专有云计算"
      keywords="专有云计算, QEC, 专有, 云计算"
      description="七牛专有云计算（QEC）是七牛云为政企、金融、能源等行业提供的，部署在客户本地数据中心或七牛云机房的云基础设施。七牛专有云计算的架构设计和公有云保持一致，兼顾公有云的快速创新能力和私有云的可管可控，以满足企业对业务信息化高性能、高可靠、可扩展、简单易用的诉求。"
    >
      <PageContent {...props} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Qec),
      newsRes: await getNews({ product: Product.Qec })
    }
  }
}
