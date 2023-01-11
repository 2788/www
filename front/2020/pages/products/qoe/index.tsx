/**
 * @file 音画质量分析
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'
import { useMobile } from 'hooks/ua'
import ProductNotice from 'components/Product/common/ProductNotice'
import Advantages from 'components/pages/products/qoe/Advantages'
import Functions from 'components/pages/products/qoe/Functions'
import Scenes from 'components/pages/products/qoe/Scenes'
import { Product } from 'constants/products'
import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNews from 'components/Product/common/ProductNews'

import bannerPc from './_images/banner-pc.jpg'
import bannerMobile from './_images/banner-mobile.jpg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {
  const isMobile = useMobile()
  const btns = useBtns(
    { href: 'https://www.wjx.top/vm/hKK7Jeq.aspx', target: '_blank', children: '申请测试' }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Qoe]
  })

  return (
    <>
      <PageBanner
        title="音画质量分析"
        desc="七牛云音画质量分析系统是结合前沿的音视频处理技术和深度学习模型打造而成，为客户提供领先的音视频质量评估服务，可精准的获取音视频资源的主客观质量分值，并快速诊断音画质量问题，为高质量的音画体验保驾护航。"
        btns={btns.banner}
        bgImgUrl={isMobile ? bannerMobile : bannerPc}
      />

      <ProductNotice {...(currentNotices || notices)} />

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

export default function Main({ globalBanners, ...pageProps }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="音画质量分析 QOE"
        keywords="音画质量分析, QOE"
        description="七牛云音画质量分析系统是结合前沿的音视频处理技术和深度学习模型打造而成，为客户提供领先的音视频质量评估服务，可精准的获取音视频资源的主客观质量分值，并快速诊断音画质量问题，为高质量的音画体验保驾护航。"
        globalBanners={globalBanners}
      >
        <PageContent {...pageProps} />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Qoe),
      newsRes: await getNews({ product: Product.Qoe }),
      globalBanners: await getGlobalBanners()
    }
  }
}
