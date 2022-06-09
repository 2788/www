/**
 * @file 产品 “画质增强” 落地页
 * @author renpanpan <renpanpan@qiniu.com>
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import Feature from 'components/pages/enhancement/Feature'
import Advantage from 'components/pages/enhancement/Advantage'
import Scene from 'components/pages/enhancement/Scene'

import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'
import { Product } from 'constants/products'

import banner from './banner.png'

const desc = '基于七牛计算机视觉与深度学习技术，提供视频画质增强服务，通过超分辨率、降噪、去模糊、去马赛克等手段，显著提升图片和视频的主观画质评价，可广泛应用于互联网媒体、直播、短视频、在线教育、广电传媒等行业应用。'

type Props = InferGetStaticPropsType<typeof getStaticProps>

function PageContent({ notices, newsRes }: Props) {
  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title="画质增强"
        desc={desc}
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner}
      />
      <ProductNotice {...notices} />
      <Navigator>{btns.nav}</Navigator>
      <Advantage />
      <Feature />
      <Scene />
      <ProductNews newsRes={newsRes} />
    </>
  )
}

export default function EnhancementPage(props: Props) {
  return (
    <Layout
      title="画质增强"
      keywords="超分辨率, 降噪, 去模糊, 去马赛克, 画质增强, 画质修复, 提升画质"
      description={desc}
    >
      <PageContent {...props} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Enhancement),
      newsRes: await getNews({ product: Product.Enhancement })
    }
  }
}
