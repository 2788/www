/**
 * @file 解决方案”监控视频边缘存储“
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import EssArch from 'components/pages/ess/Arch'
import EssIndustry from 'components/pages/ess/Industry'
import EssUnique from 'components/pages/ess/Unique'
import EssAdvantage from 'components/pages/ess/Advantage'
import EssScene from 'components/pages/ess/Scene'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import { Product } from 'constants/products'
import { useBtns } from 'hooks/product-btn'
import { useMobile } from 'hooks/ua'
import { getGlobalBanners } from 'apis/admin/global-banners'

import imgBannerPc from './images/banner-pc.jpg'
import imgBannerMobile from './images/banner-mobile.jpg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent() {
  const isMobile = useMobile()
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '咨询详情' }
  )

  return (
    <>
      <PageBanner
        title="监控视频边缘存储解决方案"
        desc="面向视频监控行业，在七牛云边缘节点和用户侧部署边缘存储服务，加速视频数据边缘上传，
        自动同步边缘中心数据，有效解决上传链路差，带宽利用率低等行业痛点，降低本地存储成本。"
        btns={btns.banner}
        bgImgUrl={isMobile ? imgBannerMobile : imgBannerPc}
      />

      <Navigator>{btns.nav}</Navigator>

      <EssArch />

      <EssIndustry />

      <EssUnique />

      <EssAdvantage />

      <EssScene />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Kodo} />
          <RelatedProduct product={Product.Qvs} />
          <RelatedProduct product={Product.Dora} />
          <RelatedProduct product={Product.Cdn} />
        </Related>
      </Section>

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function EssPage({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="监控视频边缘存储解决方案_视频监控_音视频监控存储_智能多媒体_视频边缘监控"
        keywords="边缘存储, 边缘计算, 七牛云, 视频监控, 物联网"
        description="面向视频监控行业，在七牛云边缘节点和用户侧部署边缘存储服务，加速视频数据边缘上传，自动同步边缘中心数据，有效解决上传链路差，带宽利用率低等行业痛点，降低本地存储成本。"
        globalBanners={globalBanners}
      >
        <PageContent />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
