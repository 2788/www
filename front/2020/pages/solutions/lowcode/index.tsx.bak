/**
 * @file 低代码解决方案汇总页
 * @author  zzz
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { getGlobalBanners } from 'apis/admin/global-banners'

import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Navigator from 'components/Product/Navigator'
import VideoMarketing from 'components/pages/lowcode/VideoMarketing'
import SocialEntertainment from 'components/pages/lowcode/SocialEntertainment'

import { useBtns } from 'hooks/product-btn'
import { useMobile } from 'hooks/ua'

import pcBanner from './banner.jpg'
import mobileBanner from './banner-mobile.jpg'

const title = '低代码解决方案'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {
  const isMobile = useMobile()
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  function downloadDesktop() {
    // TODO: 待补充
  }

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '立即咨询' },
    { onClick: downloadDesktop, children: '下载桌面端' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="沉淀七牛云近十年全面的音视频场景，结合七牛云低代码平台和音视频智能，提供社交互娱、视频营销、视联网、智慧新媒体、元宇宙等多个领域一站式解决方案。"
        btns={btns.banner}
        bgImgUrl={isMobile ? mobileBanner : pcBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <VideoMarketing />

      <SocialEntertainment />

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function LowCodePage({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title={title}
        keywords="低代码解决方案，社交互娱，统一消息营销触达，企业直播，图片处理分发加速，视频点播"
        description="沉淀七牛云近十年全面的音视频场景，结合七牛云低代码平台和音视频智能，提供社交互娱、视频营销、视联网、智慧新媒体、元宇宙等多个领域一站式解决方案。"
        globalBanners={globalBanners}
      >
        <Page />
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
