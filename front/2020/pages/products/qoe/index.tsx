/**
 * @file 音画质量分析
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useBtns } from 'hooks/product-btn'
import ProductNotice from 'components/Product/common/ProductNotice'
import Advantages from 'components/pages/products/qoe/Advantages'
import Functions from 'components/pages/products/qoe/Functions'
import Scenes from 'components/pages/products/qoe/Scenes'
import { Product } from 'constants/products'
import { getNews, getNotices } from 'apis/admin/product'
import ProductNews from 'components/Product/common/ProductNews'

import banner from './_images/banner.png'

function Page({ notices, newsRes }: InferGetStaticPropsType<typeof getStaticProps>) {
  const btns = useBtns(
    { href: 'https://www.wjx.top/vm/hKK7Jeq.aspx', target: '_blank', children: '申请测试' }
  )

  return (
    <>
      <PageBanner
        title="音画质量分析"
        desc="七牛云音画质量分析系统是结合前沿的音视频处理技术和深度学习模型打造而成，为客户提供领先的音视频质量评估服务，可精准的获取音视频资源的主客观质量分值，并快速诊断音画质量问题，为高质量的音画体验保驾护航。"
        btns={btns.banner}
        icon={banner} />

      <ProductNotice notices={notices} />

      <Navigator>
        {btns.nav}
      </Navigator>

      <Advantages />
      <Functions />
      <Scenes />
      <ProductNews newsRes={newsRes} />
    </>
  )
}

export default function Main(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="音画质量分析 QOE"
      keywords="音画质量分析, QOE"
      description="七牛云音画质量分析系统是结合前沿的音视频处理技术和深度学习模型打造而成，为客户提供领先的音视频质量评估服务，可精准的获取音视频资源的主客观质量分值，并快速诊断音画质量问题，为高质量的音画体验保驾护航。"
    >
      <Page {...props} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Qoe),
      newsRes: await getNews({ product: Product.Qoe })
    }
  }
}
