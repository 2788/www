import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'
import { useMobile } from 'hooks/ua'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'
import Advantage from 'components/pages/tts/Advantage'
import Scene from 'components/pages/tts/Scene'
import { Product } from 'constants/products'
import { urlForPrice } from 'utils/route'
import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
/** TODO: 暂时隐藏 */
// import Demo from 'components/pages/tts/Demo'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import Section from 'components/Product/Section'

import imgBannerPc from './images/banner-pc.jpg'
import imgBannerMobile from './images/banner-mobile.jpg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {

  const isPc = !useMobile()
  const priceUrl = urlForPrice(Product.Tts)

  const btns = useBtns(
    { children: '接口文档', href: 'https://developer.qiniu.com/dora/8091/speech-synthesis' },
    { children: '立即体验', href: '#demo', pcOnly: true },
    { children: '查看价格', href: priceUrl }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Tts]
  })

  return (
    <>
      <PageBanner
        title="语音合成"
        desc="语音合成可将文本转化成拟人化语音，采用先进的深度神经网络模型技术，合成效果自然流畅，合成度快，部署成本低，并提供多语种、多音色可供选择，满足不同业务场景需求，可广泛应用于新闻播报、小说、客服、智能硬件等场景。"
        btns={btns.banner}
        bgImgUrl={isPc ? imgBannerPc : imgBannerMobile}
      />

      <ProductNotice {...(currentNotices || notices)} />
      <Navigator>{btns.nav}</Navigator>
      {/* {isPc && <Demo />} */}
      <Advantage />
      <Scene />
      <ProductNews newsRes={newsRes} />
      <Section name="related" title="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Censor} />
          <RelatedProduct product={Product.FaceID} />
        </Related>
      </Section>
    </>
  )
}

export default function Page({ globalBanners, ...pageProps }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="智能语音_语音合成_自然语言处理_文字转语音_机器朗读"
        keywords="智能语音, 语音合成, 自然语言处理, 文字转语音, 机器朗读"
        description="语音合成可将文本转化成拟人化语音，采用先进的深度神经网络模型技术，合成效果自然流畅，合成度快，部署成本低，并提供多语种、多音色可供选择，满足不同业务场景需求，可广泛应用于新闻播报、小说、客服、智能硬件等场景。"
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
      notices: await getProductPageNotices(Product.Tts),
      newsRes: await getNews({ product: Product.Tts }),
      globalBanners: await getGlobalBanners()
    }
  }
}
